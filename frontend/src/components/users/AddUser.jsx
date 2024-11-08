import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../../slices/roleSlice.js';
import { addUser } from '../../slices/userSlice.js'; // Import addUser thunk
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

const AddUser = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [cnic, setCnic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [roleId, setRoleId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roles } = useSelector((state) => state.roles);
    const userError = useSelector((state) => state.users.error);

    useEffect(() => {
        if (!roles.length) {
            dispatch(fetchRoles());
        }
    }, [dispatch, roles.length]);

    useEffect(() => {
        if (userError) {
            setError(userError);
        }
    }, [userError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const userData = {
            fname,
            lname,
            mobileno,
            cnic,
            email,
            password,
            dob,
            gender,
            roleId,
        };

        try {
            await dispatch(addUser(userData)).unwrap();
            setSuccess('User added successfully');
            setFname(''); setLname(''); setMobileno(''); setCnic('');
            setEmail(''); setPassword(''); setDob(''); setGender(''); setRoleId('');
            setTimeout(() => navigate('/users'), 3000);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 users-page-title">
                    <Col>
                        <h2 className="text-dark">Add User 👤</h2>
                    </Col>
                    <Col className="text-end">
                        <Button variant="dark" onClick={() => navigate('/users')}>View Users</Button>
                    </Col>
                </Row>
                <div className="bg-white p-4 rounded-3 shadow">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile No</Form.Label>
                                    <Form.Control type="text" value={mobileno} onChange={(e) => setMobileno(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CNIC</Form.Label>
                                    <Form.Control type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.role_name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="dark" type="submit" disabled={!fname || !lname || !email || !password || !roleId}>
                            Add User
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default AddUser;