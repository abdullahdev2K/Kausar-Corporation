import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../slices/categorySlice.js';
import { Button, Table, Alert, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Categories = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.categories);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);
    const [deleteMessage, setDeleteMessage] = useState('');
    const userRole = useSelector((state) => state.auth.userInfo?.role);

    // State for filtering and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 5;

    useEffect(() => {
        dispatch(fetchCategories());
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
        const confirmDelete = window.confirm('Are you sure you want to delete this category?');
        if (confirmDelete) {
            try {
                await dispatch(deleteCategory(id)).unwrap();
                setDeleteMessage('Category deleted successfully.');
            } catch (error) {
                setDeleteMessage('Failed to delete category. Please try again.');
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    const filteredCategories = categories ? categories.filter((category) =>
        category?.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
    const startIndex = (currentPage - 1) * categoriesPerPage;
    const currentCategories = filteredCategories.slice(startIndex, startIndex + categoriesPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 categories-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Categories 🔠</h2>
                    </Col>
                    <Col className="text-end">
                        <Link
                            to={isAdmin ? '/add-category' : '#'}
                            className={`btn btn-dark ${!isAdmin && 'disabled-link'}`}
                        >
                            Add Category
                        </Link>
                    </Col>
                </Row>

                <Row>
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                </Row>

                {/* Filters */}
                <Form className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                        }}
                    />
                </Form>

                {/* Categories Table */}
                <Row className="categories bg-white p-3 rounded-3 shadow-lg">
                    {status === 'loading' ? (
                        <div>Loading...</div>
                    ) : currentCategories.length > 0 ? (
                        <>
                            <Table striped hover borderless responsive className="align-middle my-3">
                                <thead className="table-light">
                                    <tr>
                                        <th>Categories</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {currentCategories.map((category) => (
                                        <tr key={category.id || category.category_name}>
                                            <td>{category.category_name}</td>
                                            <td>
                                                <Link
                                                    to={isAdmin ? '/update-category' : '#'}
                                                    className={`btn btn-dark mb-3 mb-lg-0 me-3 ${
                                                        !isAdmin && 'disabled-link'
                                                    }`}
                                                    state={{ category }}
                                                >
                                                    Edit
                                                </Link>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDelete(category.id)}
                                                    className="mb-2 mb-lg-0"
                                                    disabled={!isAdmin}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            <Pagination className="justify-content-center mt-3">
                                <Pagination.First
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(1)}
                                />
                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <Pagination.Item
                                        key={i + 1}
                                        active={i + 1 === currentPage}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                                <Pagination.Last
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(totalPages)}
                                />
                            </Pagination>
                        </>
                    ) : (
                        <div>No categories found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Categories;