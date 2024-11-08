import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { updateSupplier } from '../../slices/supplierSlice.js';

const UpdateSupplier = () => {
    const location = useLocation();
    const supplier = location.state?.supplier;
    const [supplierName, setSupplierName] = useState(supplier?.supplier_name || '');
    const [supplierContact, setSupplierContact] = useState(supplier?.contact_info || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (supplier) {
            setSupplierName(supplier.supplier_name);
            setSupplierContact(supplier.contact_info);
        } else {
            setError('Supplier not found');
        }
    }, [supplier]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!supplierName.trim()) {
            setError('Supplier name is required');
            return;
        }
        if (!supplierContact.trim()) {
            setError('Supplier Contact is required');
            return;
        }
    
        if (!supplier || !supplier.id) { 
            setError('Supplier not found');
            return;
        }
    
        const updatedSupplier = {
            id: supplier.id,
            supplier_name: supplierName,
            contact_info: supplierContact
        };
    
        dispatch(updateSupplier(updatedSupplier))
            .unwrap()
            .then(() => {
                setSuccess('Supplier updated successfully');
                setTimeout(() => {
                    navigate('/suppliers', { state: { message: 'Supplier updated successfully' } });
                }, 3000);
            })
            .catch((err) => setError(err.message || 'Failed to update supplier'));
    };    

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 suppliers-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Update Supplier 📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/suppliers" className="btn btn-dark">View Suppliers</Link>
                    </Col>
                </Row>
                <Row className="bg-white p-4 mt-5 rounded-3 shadow-lg">
                    <Col md={12}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUpdateSupplierName" className="mb-3">
                                <Form.Label>Update Supplier Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Supplier Name"
                                    value={supplierName}
                                    onChange={(e) => setSupplierName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateSupplierContact" className="mb-3">
                                <Form.Label>Update Supplier Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Supplier Contact"
                                    value={supplierContact}
                                    onChange={(e) => setSupplierContact(e.target.value)}
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

export default UpdateSupplier;