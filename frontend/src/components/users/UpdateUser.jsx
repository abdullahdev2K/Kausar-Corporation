import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../../slices/userSlice.js';
import { fetchRoles } from '../../slices/roleSlice.js'; // Import fetchRoles from roleSlice
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { users } = useSelector((state) => state.users);
    const { roles } = useSelector((state) => state.roles); // Get roles from Redux store

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUsers());
        }
        if (!roles.length) {
            dispatch(fetchRoles()); // Fetch roles from the store if not loaded
        }
    }, [dispatch, users.length, roles.length]);

    const user = users.find((u) => u.id === Number(id));
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobileno: '',
        cnic: '',
        dob: '',
        role: '',
        gender: '',
    });    
    const [loading, setLoading] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (user) {
            setFormData({
                fname: user.first_name || '',
                lname: user.last_name || '',
                email: user.email || '',
                mobileno: user.mobile_no || '',
                cnic: user.cnic || '',
                dob: user.dob ? formatDate(user.dob) : '',
                role: user.roleName || '',
                gender: user.gender || '',
            });
        }
    }, [user]);    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(updateUser({ id, userData: formData })).unwrap();
            setUpdateMessage('User updated successfully');
            setTimeout(() => navigate('/users'), 3000);
        } catch (error) {
            setUpdateMessage('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 users-page-title">
                    <Col>
                        <h2 className="text-dark">Update User 👤</h2>
                    </Col>
                    <Col className="text-end">
                        <Button variant="dark" onClick={() => navigate('/users')}>View Users</Button>
                    </Col>
                </Row>
                <div className="bg-white p-4 rounded-3 shadow">
                    {updateMessage && (
                        <Alert variant={updateMessage.includes('successfully') ? 'success' : 'danger'}>
                            {updateMessage}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fname"
                                        value={formData.fname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lname"
                                        value={formData.lname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobileno"
                                        value={formData.mobileno}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CNIC</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cnic"
                                        value={formData.cnic}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>User Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.role_name}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="dark" type="submit" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Update'}
                            </Button>
                            <Button variant="outline-secondary" onClick={() => navigate('/users')}>Cancel</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default UpdateUser;