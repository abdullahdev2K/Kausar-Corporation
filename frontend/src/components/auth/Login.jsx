import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'; 
import { loginUser, resetError } from '../../slices/authSlice.js'; // Updated path to authSlice

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Access auth state
    const { loading, error, token } = useSelector((state) => state.auth); // Use auth state

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log('Logging in with:', { email, password }); // Log login attempt
        dispatch(loginUser({ email, password }));
    };    

    useEffect(() => {
        // Reset error when coming to login page
        dispatch(resetError());
    
        // Only navigate to the dashboard if a token exists
        if (token) {
            // console.log('Token is set, navigating to dashboard...');
            navigate('/dashboard');
        }
    }, [token, navigate, dispatch]);       
    
    return (
        <section className="login-sec px-3 px-md-0">
            <Container>
                <Row className="shadow-lg">
                    <Col md={6} className="d-none d-md-flex gradient-background justify-content-center align-items-center">
                        <h1 className='text-white'>Kausar Corporation</h1>
                    </Col>
                    <Col xs={12} md={6} className="bg-white p-5">
                        <h2 className="text-center text-dark mb-3 fw-bold">Login</h2>
                        <p className="text-center text-secondary mb-5 fw-semibold">Access your Shop's dashboard</p>
                        
                        <Form onSubmit={handleLogin}>
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
                            
                            <Form.Group className="mb-5" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
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
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Log In'}
                                </Button>
                            </div>

                            <Link to="/forgot-password" className="text-secondary text-decoration-none d-flex justify-content-center fw-semibold mb-4">
                                Forgot Password?
                            </Link>

                            <div className="text-center">
                                <span className="text-secondary fw-semibold">
                                    Don't have an account? <Link to="/signup" className="text-decoration-none">Register</Link>
                                </span>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;