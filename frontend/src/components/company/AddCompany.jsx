import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../../slices/companySlice.js';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AddCompany = () => {
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.companies);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCompany({ company_name: companyName }))
            .unwrap()
            .then(() => navigate('/companies', { state: { message: 'Company added successfully' } }))
            .catch((error) => console.error(error));
    };

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 companies-page-title">
                    <Col>
                        <h2 className="text-dark mb-4">Add Company 💼</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/companies" className="btn btn-dark">View Companies</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCompanyName" className="mb-3">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter company name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Add Company
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddCompany;