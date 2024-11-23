import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../slices/productSlice.js';
import { Button, Table, Alert, Container, Row, Col, Image, Pagination, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedSort, setSelectedSort] = useState('name-asc'); // default sorting by name ascending

    // Calculate paginated products
    const startIndex = (currentPage - 1) * pageSize;
    const filteredProducts = products
        .filter((product) => 
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.product_code.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product) =>
            selectedCategory ? product.categoryName === selectedCategory : true
        )
        .filter((product) =>
            selectedCompany ? product.companyName === selectedCompany : true
        )
        .sort((a, b) => {
            if (selectedSort === 'name-asc') return a.product_name.localeCompare(b.product_name);
            if (selectedSort === 'name-desc') return b.product_name.localeCompare(a.product_name);
            return 0;
        });

    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    useEffect(() => {
        dispatch(fetchProducts());
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
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await dispatch(deleteProduct(id)).unwrap();
                setDeleteMessage('Product deleted successfully.');
            } catch {
                setDeleteMessage('Failed to delete product. Please try again.');
            }
        }
    };

    const isAdmin = userRole?.toLowerCase() === 'admin';

    // Handle page change
    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 products-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Products 📦📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link
                            to={isAdmin ? '/add-product' : '#'}
                            className={`btn btn-dark ${!isAdmin && 'disabled-link'}`}
                        >
                            Add Product
                        </Link>
                    </Col>
                </Row>
                <Row className="products bg-white p-3 rounded-3 shadow-lg">
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                    {status === 'loading' && <div>Loading...</div>}
                    {status === 'failed' && <Alert variant="danger">{error}</Alert>}

                    {/* Filters */}
                    <Form className="mb-4">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name or code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    as="select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {/* Assuming categories are available in products data */}
                                    {[...new Set(products.map(product => product.categoryName))].map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    as="select"
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value)}
                                >
                                    <option value="">All Companies</option>
                                    {[...new Set(products.map(product => product.companyName))].map((company) => (
                                        <option key={company} value={company}>
                                            {company}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    as="select"
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                >
                                    <option value="name-asc">Name Ascending</option>
                                    <option value="name-desc">Name Descending</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form>

                    {status === 'succeeded' && products.length > 0 ? (
                        <>
                            <Table striped hover borderless responsive className="align-middle my-3">
                                <thead className="table-light">
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Urdu Name</th>
                                        <th>Company</th>
                                        <th>Category</th>
                                        <th>UOM</th>
                                        <th>Packing</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {paginatedProducts.map((product) => (
                                        <tr key={`${product.id}`}>
                                            <td>{product.product_code}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.product_urduname}</td>
                                            <td>{product.companyName}</td>
                                            <td>{product.categoryName}</td>
                                            <td>{product.UOM}</td>
                                            <td>{product.Packing}</td>
                                            <td>
                                                <Image
                                                    src={`http://localhost:8080/${product.product_image}`}
                                                    alt="Product"
                                                    width="100"
                                                    height="100"
                                                />
                                            </td>
                                            <td>
                                                <Link
                                                    to={isAdmin ? `/update-product/${product.id}` : '#'}
                                                    className={`btn btn-dark mb-3 mb-lg-0 me-3 ${
                                                        !isAdmin && 'disabled-link'
                                                    }`}
                                                >
                                                    Edit
                                                </Link>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDelete(product.id)}
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

                            {/* Pagination controls */}
                            <Pagination className="justify-content-center">
                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item
                                        key={index}
                                        active={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                            </Pagination>
                        </>
                    ) : (
                        <div>No Products found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Products;