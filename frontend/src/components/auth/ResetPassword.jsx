import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { resetPassword } from '../../slices/authSlice';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        dispatch(resetPassword({ resetToken, password })).then(() => {
            setLoading(false);
            navigate('/');
        }).catch(() => {
            setLoading(false);
            setError('Failed to reset password');
        });
    };

    return (
        <section className="reset-password-sec px-3 px-md-0">
            <Container>
                <Row className="shadow-lg">
                    <Col md={6} className="d-none d-md-flex gradient-background justify-content-center align-items-center">
                        <h1 className="text-white">Kausar Corporation</h1>
                    </Col>
                    <Col xs={12} md={6} className="bg-white p-5">
                        <h2 className="text-center text-dark mb-3 fw-bold">Reset Password</h2>
                        <p className="text-center text-secondary mb-5 fw-semibold">Enter your new password below.</p>

                        <Form onSubmit={handleResetPassword}>
                            {error && (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            )}

                            <Form.Group className="mb-4" controlId="password">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="confirmPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter new password"
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
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ResetPassword;