import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlice.js";
import { Table, Alert, Container, Row, Col, Form, Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Inventory = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    const location = useLocation();
    const successMessage = location.state?.message;
    const [showSuccessMessage, setShowSuccessMessage] = useState(!!successMessage);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    // Calculate filtered and paginated products
    const startIndex = (currentPage - 1) * pageSize;
    const filteredProducts = products
        .filter(
            (product) =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.product_urduname.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product) =>
            selectedCategory ? product.categoryName === selectedCategory : true
        )
        .filter((product) =>
            selectedCompany ? product.companyName === selectedCompany : true
        );

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

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 justify-content-between mb-5 inventory-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Inventory 📦📦</h2>
                    </Col>
                </Row>
                <Row className="bg-white p-3 rounded-3 shadow-lg">
                    {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
                    {status === "loading" && <div>Loading...</div>}
                    {status === "failed" && <Alert variant="danger">{error}</Alert>}

                    {/* Filters */}
                    <Form className="mb-4">
                        <Row>
                            <Col md={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by code, name, or Urdu name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {[...new Set(products.map((product) => product.categoryName))].map(
                                        (category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    as="select"
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value)}
                                >
                                    <option value="">All Companies</option>
                                    {[...new Set(products.map((product) => product.companyName))].map(
                                        (company) => (
                                            <option key={company} value={company}>
                                                {company}
                                            </option>
                                        )
                                    )}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form>

                    {status === "succeeded" && products.length > 0 ? (
                        <>
                            <Table striped hover borderless responsive className="align-middle my-3">
                                <thead className="table-light">
                                    <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Urdu Name</th>
                                        <th>Category</th>
                                        <th>Company</th>
                                        <th>Quantity</th>
                                        <th>Rack</th>
                                        <th>Min Qty</th>
                                        <th>Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProducts.map((product) => {
                                        // Determine row class based on quantity and min_quantity
                                        const rowClass =
                                            product.quantity === 0
                                                ? "table-danger" // Red for 0 quantity
                                                : product.quantity < product.min_quantity
                                                ? "table-warning" // Warning color for low stock
                                                : ""; // Default color if none of the conditions are met

                                        return (
                                            <tr key={product.id} className={rowClass}>
                                                <td>{product.product_code}</td>
                                                <td>{product.product_name}</td>
                                                <td>{product.product_urduname}</td>
                                                <td>{product.categoryName}</td>
                                                <td>{product.companyName}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.rack}</td>
                                                <td>{product.min_quantity}</td>
                                                <td>{product.lastUpdated}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            <Pagination className="justify-content-center">
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
                    ) : (
                        <div>No Products Found.</div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Inventory;