import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../slices/userSlice.js';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Alert, Spinner, Form, Pagination } from 'react-bootstrap';

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [deleteMessage, setDeleteMessage] = useState('');
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    // Filtered and paginated users
    const startIndex = (currentPage - 1) * pageSize;
    const filteredUsers = users
        .filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            return (
                fullName.includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        .filter((user) => (selectedRole ? user.roleName === selectedRole : true));

    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredUsers.length / pageSize);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => setDeleteMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [deleteMessage]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await dispatch(deleteUser(id)).unwrap();
                setDeleteMessage('User deleted successfully.');
            } catch (error) {
                setDeleteMessage('Failed to delete user. Please try again.');
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
                            to={isAdmin ? '/add-user' : '#'}
                            className={`btn btn-dark ${!isAdmin && 'disabled-link'}`}
                        >
                            Add User
                        </Link>
                    </Col>
                </Row>
                {error && <Alert variant="danger">{error}</Alert>}
                {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}

                {/* Filters */}
                <Form className="mb-4">
                    <Row>
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or email"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                as="select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="">All Roles</option>
                                {[...new Set(users.map((user) => user.roleName))].map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                </Form>

                <Row className="bg-white p-4 rounded-3 shadow-lg">
                    <Table responsive bordered hover className="align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>CNIC</th>
                                <th>Mobile No</th>
                                <th>Role</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        <Spinner animation="border" role="status" size="sm" className="me-2" />
                                        Loading...
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{`${user.first_name} ${user.last_name}`}</td>
                                        <td>{user.email}</td>
                                        <td>{user.cnic}</td>
                                        <td>{user.mobile_no}</td>
                                        <td>{user.roleName}</td>
                                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={isAdmin ? `/update-user/${user.id}` : '#'}
                                                className={`btn btn-dark btn-sm me-2 mb-2 mb-lg-0 ${!isAdmin && 'disabled-link'}`}
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

                    {/* Pagination */}
                    <Pagination className="justify-content-center mt-3">
                        <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                    </Pagination>
                </Row>
            </Container>
        </div>
    );
};

export default Users;