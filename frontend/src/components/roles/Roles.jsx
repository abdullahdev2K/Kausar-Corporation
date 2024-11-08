import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, deleteRole } from '../../slices/roleSlice.js';
import { Button, Table, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Roles = () => {
    const dispatch = useDispatch();
    const { roles, status, error } = useSelector((state) => state.roles);
    const userRole = useSelector((state) => state.auth.userInfo?.role);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);
    const [deleteMessage, setDeleteMessage] = useState('');

    useEffect(() => {
        dispatch(fetchRoles());
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
        const confirmDelete = window.confirm("Are you sure you want to delete this role?");
        if (confirmDelete) {
            try {
                await dispatch(deleteRole(id)).unwrap();
                setDeleteMessage("Role deleted successfully.");
            } catch (error) {
                setDeleteMessage("Failed to delete role. Please try again.");
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 roles-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Roles 🛠️</h2>
                    </Col>
                    <Col className="text-end">
                        <Link 
                            to={isAdmin ? "/add-role" : "#"} 
                            className={`btn btn-dark ${!isAdmin && "disabled-link"}`} 
                            disabled={!isAdmin}
                        >
                            Add Role
                        </Link>
                    </Col>
                </Row>
                <Row className="roles bg-white p-3 rounded-3 shadow-lg">
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {status === 'loading' && <div>Loading...</div>}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                    {status === 'succeeded' && roles && roles.length > 0 ? (
                        <Table striped hover borderless responsive className="align-middle my-3">
                            <thead className="table-light">
                                <tr>
                                    <th>Roles</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {roles.map((role) => (
                                    role ? (
                                        <tr key={role.id}>
                                            <td>{role.role_name ?? "No role name"}</td>
                                            <td>
                                                <Link 
                                                    to={isAdmin ? "/update-role" : "#"} 
                                                    state={{ role }} 
                                                    className={`btn btn-dark mb-3 mb-lg-0 me-3 ${!isAdmin && "disabled-link"}`}
                                                    disabled={!isAdmin}
                                                >
                                                    Edit
                                                </Link>
                                                <Button 
                                                    variant="danger" 
                                                    onClick={() => handleDelete(role.id)} 
                                                    className="mb-2 mb-lg-0" 
                                                    disabled={!isAdmin}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>No roles found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Roles;