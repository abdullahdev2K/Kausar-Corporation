import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { updateRole } from '../../slices/roleSlice.js';

const UpdateRole = () => {
    const location = useLocation();
    const role = location.state?.role;
    const [roleName, setRoleName] = useState(role?.role_name || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (role) {
            setRoleName(role.role_name);
        } else {
            setError('Role not found');
        }
    }, [role]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!roleName.trim()) {
            setError('Role name is required');
            return;
        }
    
        if (!role || !role.id) { 
            setError('Role not found');
            return;
        }
    
        const updatedRole = {
            id: role.id,
            role_name: roleName
        };
    
        dispatch(updateRole(updatedRole))
            .unwrap()
            .then(() => {
                setSuccess('Role updated successfully');
                setTimeout(() => {
                    navigate('/roles', { state: { message: 'Role updated successfully' } });
                }, 3000);
            })
            .catch((err) => setError(err.message || 'Failed to update role'));
    };    

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 roles-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Update Role 🛠️</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/roles" className="btn btn-dark">View Roles</Link>
                    </Col>
                </Row>
                <Row className="bg-white p-4 mt-5 rounded-3 shadow-lg">
                    <Col md={12}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUpdateRoleName" className="mb-3">
                                <Form.Label>Update Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Role"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="fw-semibold">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateRole;