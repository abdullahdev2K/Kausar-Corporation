import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRole } from '../../slices/roleSlice';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AddRole = () => {
    const [roleName, setRoleName] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.roles);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRole({ role_name: roleName }))
            .unwrap()
            .then(() => navigate('/roles', { state: { message: 'Role added successfully' } }))
            .catch((error) => console.error(error));
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 roles-page-title">
                    <Col>
                        <h2 className="text-dark mb-4">Add Role 🛠️</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/roles" className="btn btn-dark">View Roles</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formRoleName" className="mb-3">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter role name"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Add Role
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddRole;