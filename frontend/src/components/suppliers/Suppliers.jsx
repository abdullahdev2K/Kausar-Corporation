import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, deleteSupplier } from '../../slices/supplierSlice.js';
import { Button, Table, Alert, Container, Row, Col, Form, Pagination, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Suppliers = () => {
    const dispatch = useDispatch();
    const { suppliers = [], status, error } = useSelector((state) => state.suppliers);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);
    const [deleteMessage, setDeleteMessage] = useState('');
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Filtered and paginated suppliers
    const startIndex = (currentPage - 1) * pageSize;
    const filteredSuppliers = suppliers
    .filter((supplier) => {
        const name = supplier.supplier_name || ''; // Default to an empty string if undefined
        const contact = supplier.primary_contact || ''; // Default to an empty string if undefined
        return (
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
    .filter((supplier) => (selectedCity ? supplier.city === selectedCity : true));

    const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredSuppliers.length / pageSize);

    useEffect(() => {
        dispatch(fetchSuppliers());
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
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (confirmDelete) {
            try {
                await dispatch(deleteSupplier(id)).unwrap();
                setDeleteMessage("Supplier deleted successfully.");
            } catch (error) {
                setDeleteMessage("Failed to delete supplier. Please try again.");
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 suppliers-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Suppliers 📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link 
                            to={isAdmin ? "/add-supplier" : "#"} 
                            className={`btn btn-dark ${!isAdmin && "disabled-link"}`}
                        >
                            Add Supplier
                        </Link>
                    </Col>
                </Row>
                <Row>
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                </Row>

                {/* Filters */}
                <Form className="mb-4">
                    <Row>
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or contact"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                as="select"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="">All Cities</option>
                                {[...new Set(suppliers.map((supplier) => supplier.city).filter(Boolean))].map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                </Form>

                {/* Table */}
                <Row className="suppliers bg-white p-3 rounded-3 shadow-lg">
                    {status === 'loading' ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status" size="sm" className="me-2" />
                            Loading...
                        </div>
                    ) : (
                        <>
                            <Table striped hover borderless responsive className="align-middle my-3">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Urdu Name</th>
                                        <th>Primary Contact</th>
                                        <th>Primary Address</th>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {paginatedSuppliers.length > 0 ? (
                                        paginatedSuppliers.map((supplier) => (
                                            <tr key={`${supplier.id}-${supplier.contact_info}`}>
                                                <td>{supplier.supplier_name}</td>
                                                <td>{supplier.supplier_urduname}</td>
                                                <td>{supplier.primary_contact}</td>
                                                <td>{supplier.primary_address}</td>
                                                <td>{supplier.city}</td>
                                                <td>
                                                    <Link
                                                        to={isAdmin ? '/update-supplier' : '#'}
                                                        className={`btn btn-dark mb-3 mb-lg-0 me-3 ${
                                                            !isAdmin && 'disabled-link'
                                                        }`}
                                                        state={{ supplier }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(supplier.id)}
                                                        className="mb-2 mb-lg-0"
                                                        disabled={!isAdmin}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No Suppliers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            <Pagination className="justify-content-center mt-3">
                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item
                                        key={index}
                                        active={index + 1 === currentPage}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                />
                            </Pagination>
                        </>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Suppliers;