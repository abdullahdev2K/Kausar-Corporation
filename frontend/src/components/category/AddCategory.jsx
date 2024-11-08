import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../slices/categorySlice.js';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.categories);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory({ category_name: categoryName }))
            .unwrap()
            .then(() => navigate('/categories', { state: { message: 'Category added successfully' } }))
            .catch((error) => console.error(error));
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 categories-page-title">
                    <Col>
                        <h2 className="text-dark mb-4">Add Category 🔠</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/categories" className="btn btn-dark">View Categories</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCategoryName" className="mb-3">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Add Category
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddCategory;