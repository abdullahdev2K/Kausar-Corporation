import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../../slices/customerSlice.js';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AddCustomer = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerContact, setCustomerContact] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.customers);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCustomer({ customer_name: customerName, contact_info: customerContact, address: customerAddress}))
            .unwrap()
            .then(() => navigate('/customers', { state: { message: 'Customer added successfully' } }))
            .catch((error) => console.error(error));
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 customers-page-title">
                    <Col>
                        <h2 className="text-dark mb-4">Add Customer 👤</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/customers" className="btn btn-dark">View Customers</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCustomerName" className="mb-3">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCustomerContact" className="mb-3">
                                <Form.Label>Customer Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer contact"
                                    value={customerContact}
                                    onChange={(e) => setCustomerContact(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCustomerAddress" className="mb-3">
                                <Form.Label>Customer Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer address"
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Add Customer
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddCustomer;