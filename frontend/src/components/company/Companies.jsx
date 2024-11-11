import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, deleteCompany } from '../../slices/companySlice';
import { Button, Table, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Companies = () => {
    const dispatch = useDispatch();
    const { companies, status, error } = useSelector((state) => state.companies);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);
    const [deleteMessage, setDeleteMessage] = useState('');
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => {
                setDeleteMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [deleteMessage]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            try {
                await dispatch(deleteCompany(id)).unwrap();
                setDeleteMessage("Company deleted successfully.");
            } catch (error) {
                setDeleteMessage("Failed to delete Company. Please try again.");
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 companies-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Companies 💼</h2>
                    </Col>
                    <Col className="text-end">
                        <Link 
                            to={isAdmin ? "/add-company" : "#"} 
                            className={`btn btn-dark ${!isAdmin && "disabled-link"}`}
                        >
                            Add Company
                        </Link>
                    </Col>
                </Row>
                <Row className="companies bg-white p-3 rounded-3 shadow-lg">
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {status === 'loading' && <div>Loading...</div>}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                    {status === 'succeeded' && companies.length > 0 ? (
                        <Table striped hover borderless responsive className="align-middle my-3">
                            <thead className="table-light">
                                <tr>
                                    <th>Companies</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {companies.map((company, index) => (
                                    <tr key={index}>
                                        <td>{company.company_name}</td>
                                        <td>
                                            <Link 
                                                to={isAdmin ? "/update-company" : "#"} 
                                                className={`btn btn-dark mb-3 mb-lg-0 me-3 ${!isAdmin && "disabled-link"}`}
                                                state={{ company }}
                                            >
                                                Edit
                                            </Link>
                                            <Button variant="danger" onClick={() => handleDelete(company.id)} className="mb-2 mb-lg-0" disabled={!isAdmin}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>No companies found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Companies;