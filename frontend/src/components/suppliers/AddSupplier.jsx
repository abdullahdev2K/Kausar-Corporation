import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSupplier } from '../../slices/supplierSlice.js';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AddSupplier = () => {
    const [supplierName, setSupplierName] = useState('');
    const [supplierContact, setSupplierContact] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.suppliers);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addSupplier({ supplier_name: supplierName, contact_info: supplierContact}))
            .unwrap()
            .then(() => navigate('/suppliers', { state: { message: 'Supplier added successfully' } }))
            .catch((error) => console.error(error));
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 suppliers-page-title">
                    <Col>
                        <h2 className="text-dark mb-4">Add Supplier 📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/suppliers" className="btn btn-dark">View Suppliers</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formSupplierName" className="mb-3">
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter supplier name"
                                    value={supplierName}
                                    onChange={(e) => setSupplierName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formSupplierContact" className="mb-3">
                                <Form.Label>Supplier Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter supplier contact"
                                    value={supplierContact}
                                    onChange={(e) => setSupplierContact(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Add Supplier
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddSupplier;