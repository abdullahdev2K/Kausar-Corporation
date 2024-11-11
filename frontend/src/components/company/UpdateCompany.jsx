import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { updateCompany } from '../../slices/companySlice.js';

const UpdateCompany = () => {
    const location = useLocation();
    const company = location.state?.company;
    const [companyName, setCompanyName] = useState(company?.company_name || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (company) {
            setCompanyName(company.company_name);
        } else {
            setError('Company not found');
        }
    }, [company]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!companyName.trim()) {
            setError('Company name is required');
            return;
        }
    
        if (!company || !company.id) { 
            setError('Company not found');
            return;
        }
    
        const updatedCompany = {
            id: company.id,
            company_name: companyName
        };
    
        dispatch(updateCompany(updatedCompany))
            .unwrap()
            .then(() => {
                setSuccess('Company updated successfully');
                setTimeout(() => {
                    navigate('/companies', { state: { message: 'Company updated successfully' } });
                }, 3000);
            })
            .catch((err) => setError(err.message || 'Failed to update company'));
    };    

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 companies-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Update Company 💼</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/companies" className="btn btn-dark">View Companies</Link>
                    </Col>
                </Row>
                <Row className="bg-white p-4 mt-5 rounded-3 shadow-lg">
                    <Col md={12}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUpdateCompanyName" className="mb-3">
                                <Form.Label>Update Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Update Company"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
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

export default UpdateCompany;