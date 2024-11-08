import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, resetError } from '../../slices/authSlice.js';

const Signup = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        mobileno: '',
        cnic: '',
        email: '',
        password: '',
        rePassword: '',
        dob: '',
        gender: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value, // Check if the input is a file input
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure passwords match before dispatching the signup
        if (formData.password !== formData.rePassword) {
            alert('Passwords do not match');
            return;
        }
    
        // Create FormData object
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }
    
        // Dispatch the signup action
        dispatch(signupUser(formDataObj));
    };        

    // Navigate to another page on successful signup
    useEffect(() => {
        if (userInfo) {
            navigate('/'); // Change to your preferred route after signup
        }
    }, [userInfo, navigate]);

    // Reset error on unmount or input change
    useEffect(() => {
        return () => {
            if (error) {
                dispatch(resetError());
            }
        };
    }, [dispatch, error]);

    return (
        <Container className="signup-sec px-3 px-md-0">
            <Row className="shadow-lg">
                <Col md={6} className="bg-white px-4 py-5">
                    <h2 className="text-center text-dark mb-3 fw-bold">Sign Up</h2>
                    <p className="text-center text-secondary mb-4 fw-semibold">Get started by filling out the form below.</p>

                    {/* Display error message */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Form Start */}
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col lg={6}>
                                <Form.Group controlId="fname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fname"
                                        value={formData.fname}
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId="lname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lname"
                                        value={formData.lname}
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="mobileno">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobileno"
                                value={formData.mobileno}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cnic">
                            <Form.Label>CNIC</Form.Label>
                            <Form.Control
                                type="text"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                placeholder="Enter CNIC"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="re-password">
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="rePassword"
                                value={formData.rePassword}
                                onChange={handleChange}
                                placeholder="Re-enter password"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="profilePicture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                name="profilePicture"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button type="submit" variant="dark" className="w-100 fw-semibold" disabled={loading}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    </Form>

                    <div className="text-center mt-4 fw-semibold">
                        <span className="text-secondary">Already have an account? </span>
                        <Link to="/" className="text-decoration-none">Login</Link>
                    </div>
                </Col>
                <Col md={6} className="d-none d-md-flex justify-content-center align-items-center gradient-background">
                    <h1 className='text-white'>Kausar Corporation</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;