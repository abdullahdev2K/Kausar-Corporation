import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer } from '../../slices/customerSlice.js';
import { Button, Table, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Customers = () => {
    const dispatch = useDispatch();
    const { customers, status, error } = useSelector((state) => state.customers);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);
    const [deleteMessage, setDeleteMessage] = useState('');
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => {
                setDeleteMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [deleteMessage]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (confirmDelete) {
            try {
                await dispatch(deleteCustomer(id)).unwrap();
                setDeleteMessage("Customer deleted successfully.");
            } catch (error) {
                setDeleteMessage("Failed to delete customer. Please try again.");
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 customers-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Customers 👥</h2>
                    </Col>
                    <Col className="text-end">
                        <Link 
                            to={isAdmin ? "/add-customer" : "#"} 
                            className={`btn btn-dark ${!isAdmin && "disabled-link"}`}
                        >
                            Add Customer
                        </Link>
                    </Col>
                </Row>
                <Row className="customers bg-white p-3 rounded-3 shadow-lg">
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {status === 'loading' && <div>Loading...</div>}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                    {status === 'succeeded' && customers.length > 0 ? (
                        <Table striped hover borderless responsive className="align-middle my-3">
                            <thead className="table-light">
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Customer Contact</th>
                                    <th>Customer Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {customers.map((customer) => (
                                    <tr key={`${customer.id}-${customer.contact_info}`}>
                                        <td>{customer.customer_name}</td>
                                        <td>{customer.contact_info}</td>
                                        <td>{customer.address}</td>
                                        <td>
                                            <Link 
                                                to={isAdmin ? "/update-customer" : "#"} 
                                                className={`btn btn-dark mb-3 mb-lg-0 me-3 ${!isAdmin && "disabled-link"}`}
                                                state={{ customer }}
                                            >
                                                Edit
                                            </Link>
                                            <Button variant="danger" onClick={() => handleDelete(customer.id)} className="mb-2 mb-lg-0" disabled={!isAdmin}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>No Customers found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Customers;