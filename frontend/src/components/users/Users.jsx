import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../slices/userSlice.js';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Alert, Spinner } from 'react-bootstrap';

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [deleteMessage, setDeleteMessage] = useState(''); // State for delete success message
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => setDeleteMessage(''), 3000); // Hide message after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [deleteMessage]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await dispatch(deleteUser(id)).unwrap();
                setDeleteMessage("User deleted successfully."); // Set success message on successful delete
            } catch (error) {
                setDeleteMessage("Failed to delete user. Please try again.");
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    return (
        <div id="main">
            <Container>
                <Row className="users-page-title pb-4 d-flex justify-content-between mb-5">
                    <Col xs="auto">
                        <h2 className="text-dark mb-0">Users 👥</h2>
                    </Col>
                    <Col xs="auto">
                        <Link 
                            to={isAdmin ? "/add-role" : "#"} 
                            className={`btn btn-dark ${!isAdmin && "disabled-link"}`}
                        >
                            Add User
                        </Link>
                    </Col>
                </Row>
                {error && <Alert variant="danger">{error}</Alert>}
                {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>} {/* Display delete success message */}
                <Row className="bg-white p-4 rounded-3 shadow-lg">
                    <Table responsive bordered hover className="align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>CNIC</th>
                                <th>Role</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <Spinner animation="border" role="status" size="sm" className="me-2" />
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{`${user.first_name} ${user.last_name}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.cnic}</td>
                                    <td>{user.roleName}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Link 
                                            to={isAdmin ? `/update-user/${user.id}` : "#"} 
                                            className={`btn btn-dark btn-sm me-2 mb-2 mb-lg-0 ${!isAdmin && "disabled-link"}`}
                                        >
                                            Edit
                                        </Link>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)} disabled={!isAdmin}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}

                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
};

export default Users;