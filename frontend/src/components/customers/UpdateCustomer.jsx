import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { updateCustomer } from '../../slices/customerSlice.js';

const UpdateCustomer = () => {
    const location = useLocation();
    const customer = location.state?.customer;
    const [customerName, setCustomerName] = useState(customer?.customer_name || '');
    const [customerContact, setCustomerContact] = useState(customer?.contact_info || '');
    const [customerAddress, setCustomerAddress] = useState(customer?.address || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
            setCustomerName(customer.customer_name);
            setCustomerContact(customer.contact_info);
            setCustomerAddress(customer.address);
        } else {
            setError('Customer not found');
        }
    }, [customer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customerName.trim()) {
            setError('Customer name is required');
            return;
        }
        if (!customerContact.trim()) {
            setError('Customer contact is required');
            return;
        }
    
        if (!customer || !customer.id) { 
            setError('Customer not found');
            return;
        }
    
        const updatedCustomer = {
            id: customer.id,
            customer_name: customerName,
            contact_info: customerContact,
            address: customerAddress
        };
    
        dispatch(updateCustomer(updatedCustomer))
            .unwrap()
            .then(() => {
                setSuccess('Customer updated successfully');
                setTimeout(() => {
                    navigate('/customers', { state: { message: 'Customer updated successfully' } });
                }, 3000);
            })
            .catch((err) => setError(err.message || 'Failed to update customer'));
    };    

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 customers-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Update Customer 👤</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/customers" className="btn btn-dark">View Customers</Link>
                    </Col>
                </Row>
                <Row className="bg-white p-4 mt-5 rounded-3 shadow-lg">
                    <Col md={12}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUpdateCustomerName" className="mb-3">
                                <Form.Label>Update Customer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Customer Name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateCustomerContact" className="mb-3">
                                <Form.Label>Update Customer Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Customer Contact"
                                    value={customerContact}
                                    onChange={(e) => setCustomerContact(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateCustomerAddress" className="mb-3">
                                <Form.Label>Update Customer Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Customer Address"
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
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

export default UpdateCustomer;