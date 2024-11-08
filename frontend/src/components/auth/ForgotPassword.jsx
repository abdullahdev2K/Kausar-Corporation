import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { forgotPassword, resetError } from '../../slices/authSlice'; // Updated to forgotPassword action

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Access auth state
    const { loading, error, success } = useSelector((state) => state.auth); 

    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log('Requesting password reset for:', { email });
        dispatch(forgotPassword({ email }));
    };

    useEffect(() => {
        // Reset error when coming to forgot password page
        dispatch(resetError());

        if (success) {
            // Navigate to login page if the request is successful
            navigate('/');
        }
    }, [success, navigate, dispatch]);

    return (
        <section className="forgot-password-sec px-3 px-md-0">
            <Container>
                <Row className="shadow-lg">
                    <Col md={6} className="d-none d-md-flex gradient-background justify-content-center align-items-center">
                        <h1 className="text-white">Kausar Corporation</h1>
                    </Col>
                    <Col xs={12} md={6} className="bg-white p-5">
                        <h2 className="text-center text-dark mb-3 fw-bold">Forgot Password</h2>
                        <p className="text-center text-secondary mb-5 fw-semibold">Reset your account password</p>

                        <Form onSubmit={handleForgotPassword}>
                            {error && (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            )}

                            <Form.Group className="mb-5" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>

                            <div className="d-grid mb-4">
                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="fw-semibold"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                                </Button>
                            </div>

                            <div className="text-center">
                                <span className="text-secondary fw-semibold">
                                    Remember your password? <Link to="/" className="text-decoration-none">Log In</Link>
                                </span>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ForgotPassword;