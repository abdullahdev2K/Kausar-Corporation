import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { updateCategory } from '../../slices/categorySlice.js';

const UpdateCategory = () => {
    const location = useLocation();
    const category = location.state?.category;
    const [categoryName, setCategoryName] = useState(category?.category_name || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (category) {
            setCategoryName(category.category_name);
        } else {
            setError('Category not found');
        }
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }
    
        if (!category || !category.id) { 
            setError('Category not found');
            return;
        }
    
        const updatedCategory = {
            id: category.id,
            category_name: categoryName
        };
    
        dispatch(updateCategory(updatedCategory))
            .unwrap()
            .then(() => {
                setSuccess('Category updated successfully');
                setTimeout(() => {
                    navigate('/categories', { state: { message: 'Category updated successfully' } });
                }, 3000);
            })
            .catch((err) => setError(err.message || 'Failed to update category'));
    };    

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 categories-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Update Category 🔠</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/categories" className="btn btn-dark">View Categories</Link>
                    </Col>
                </Row>
                <Row className="bg-white p-4 mt-5 rounded-3 shadow-lg">
                    <Col md={12}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUpdateCategoryName" className="mb-3">
                                <Form.Label>Update Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Category"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="fw-semibold">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateCategory;