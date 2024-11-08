import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, deleteSupplier } from '../../slices/supplierSlice.js';
import { Button, Table, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Suppliers = () => {
    const dispatch = useDispatch();
    const { suppliers, status, error } = useSelector((state) => state.suppliers);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);
    const [deleteMessage, setDeleteMessage] = useState('');
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    useEffect(() => {
        dispatch(fetchSuppliers());
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
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (confirmDelete) {
            try {
                await dispatch(deleteSupplier(id)).unwrap();
                setDeleteMessage("Supplier deleted successfully.");
            } catch (error) {
                setDeleteMessage("Failed to delete supplier. Please try again.");
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 suppliers-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Suppliers 📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link 
                            to={isAdmin ? "/add-supplier" : "#"} 
                            className={`btn btn-dark ${!isAdmin && "disabled-link"}`}
                        >
                            Add Supplier
                        </Link>
                    </Col>
                </Row>
                <Row className="suppliers bg-white p-3 rounded-3 shadow-lg">
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {status === 'loading' && <div>Loading...</div>}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                    {status === 'succeeded' && suppliers.length > 0 ? (
                        <Table striped hover borderless responsive className="align-middle my-3">
                            <thead className="table-light">
                                <tr>
                                    <th>Supplier Name</th>
                                    <th>Supplier Contact</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {suppliers.map((supplier) => (
                                    <tr key={supplier.id}>
                                        <td>{supplier.supplier_name}</td>
                                        <td>{supplier.contact_info}</td>
                                        <td>
                                            <Link 
                                                to={isAdmin ? "/update-supplier" : "#"} 
                                                className={`btn btn-dark mb-3 mb-lg-0 me-3 ${!isAdmin && "disabled-link"}`}
                                                state={{ supplier }}
                                            >
                                                Edit
                                            </Link>
                                            <Button variant="danger" onClick={() => handleDelete(supplier.id)} className="mb-2 mb-lg-0" disabled={!isAdmin}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>No Suppliers found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Suppliers;