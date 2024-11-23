import  { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../slices/productSlice.js';
import { fetchCategories } from '../../slices/categorySlice.js';
import { fetchCompanies } from '../../slices/companySlice.js';
import { Form, Button, Alert, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        product_code: '',
        company_id: '',
        category_id: '',
        product_name: '',
        product_urduname: '',
        description: '',
        UOM: '',
        Cost: '',
        WholeSale: '',
        Retail: '',
        Cash: '',
        service_charges: '',
        Packing: '',
        product_image: '',
        rack: '',
        min_quantity: '',
    });
    const categories = useSelector((state) => state.categories.categories);
    const companies = useSelector((state) => state.companies.companies);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUrduMapOpen, setIsUrduMapOpen] = useState(false);
    const urduNameFieldRef = useRef(null);

    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.products);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchCompanies());
    }, [dispatch]);

    const urduCharacterMap = {
        a: 'ا', b: 'ب', c: 'ث', d: 'د', e: 'ے', f: 'ف', g: 'گ', h: 'ح', i: 'ی',
        j: 'ج', k: 'ک', l: 'ل', m: 'م', n: 'ن', o: 'و', p: 'پ', q: 'ق', r: 'ر',
        s: 'س', t: 'ت', u: 'ط', v: 'ظ', w: 'و', x: 'ش', y: 'ی', z: 'ز',
        '`': 'آ', '1': 'ٹ', '2': 'ژ', '3': 'ڑ', '4': 'ذ', '5': 'ڈ', '6': 'خ',
        '7': 'چ', '8': 'غ', '9': 'ث', '0': 'ص'
    };

    const mapToUrdu = (text) => {
        return text
            .split('')
            .map((char) => urduCharacterMap[char] || char)
            .join('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the urduNameFieldRef
            if (
                urduNameFieldRef.current &&
                !urduNameFieldRef.current.contains(event.target)
            ) {
                setIsUrduMapOpen(false); // Close the Urdu map if clicked outside
            }
        };

        // Add event listener for clicks on the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'product_urduname') {
            setProductData({
                ...productData,
                [name]: mapToUrdu(value),
            });

            setIsUrduMapOpen(true); // Open the Urdu map when typing in the field
        } else {
            setProductData({
                ...productData,
                [name]: value,
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // Limit to 5MB
                alert('File size exceeds the limit');
            } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert('Only JPG or PNG images are allowed');
            } else {
                setSelectedImage(file);
            }
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('product_code', productData.product_code);
        formData.append('company_id', productData.company_id);
        formData.append('category_id', productData.category_id);
        formData.append('product_name', productData.product_name);
        formData.append('product_urduname', productData.product_urduname);
        formData.append('description', productData.description);
        formData.append('UOM', productData.UOM);
        formData.append('Cost', productData.Cost);
        formData.append('WholeSale', productData.WholeSale);
        formData.append('Retail', productData.Retail);
        formData.append('Cash', productData.Cash);
        formData.append('service_charges', productData.service_charges); // Fix field name
        formData.append('Packing', productData.Packing);
        formData.append('rack', productData.rack); // Fix field name
        formData.append('min_quantity', productData.min_quantity); // Fix field name
    
        if (selectedImage) {
            formData.append('product_image', selectedImage);
        }

        // Log formData entries to verify it
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
            await dispatch(addProduct(formData)).unwrap();
            setProductData({
                product_code: '',
                company_id: '',
                category_id: '',
                product_name: '',
                product_urduname: '',
                description: '',
                UOM: '',
                Cost: '',
                WholeSale: '',
                Retail: '',
                Cash: '',
                service_charges: '', // Fix field name
                Packing: '',
                product_image: '',
                rack: '',
                min_quantity: '',
            });
            // You can also display a success message to the user
            navigate('/products', { state: { message: 'Product added successfully' } });
        } catch (error) {
            console.error('Error:', error);
            // Display error to user
        }
    };              

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 products-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Add Product 📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/products" className="btn btn-dark">View Products</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {status === 'failed' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Form.Group controlId="formProductCode" className="mb-3">
                                <Form.Label>Product Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="product_code"
                                    placeholder="Enter product code"
                                    value={productData.product_code}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formProductName" className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="product_name"
                                    placeholder="Enter product name"
                                    value={productData.product_name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formProductUrduName" className="mb-3">
                                <Form.Label>Product Urdu Name</Form.Label>
                                <div ref={urduNameFieldRef}>
                                    <Form.Control
                                        type="text"
                                        name="product_urduname"
                                        placeholder="Enter product Urdu name"
                                        value={productData.product_urduname}
                                        onChange={handleChange}
                                        required
                                    />
                                    <small className="text-muted">
                                        Use the mapping guide below for typing in Urdu.
                                    </small>
                                    {isUrduMapOpen && (
                                        <Table striped bordered hover className="mt-3">
                                            <thead>
                                                <tr>
                                                    <th>English Key</th>
                                                    <th>Urdu Character</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(urduCharacterMap).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td>{value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formDescription" className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder="Enter description"
                                    value={productData.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formCompanyId" className="mb-3">
                                        <Form.Label>Company</Form.Label>
                                        <Form.Select
                                            name="company_id"
                                            value={productData.company_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select company</option>
                                            {companies && companies.map(company => (
                                                <option key={company.id} value={company.id}> {/* Use numeric 'id' field */}
                                                    {company.company_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formCategoryId" className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select
                                            name="category_id"
                                            value={productData.category_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select category</option>
                                            {categories && categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formUOM" className="mb-3">
                                        <Form.Label>Unit of Measure (UOM)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="UOM"
                                            placeholder="Enter UOM"
                                            value={productData.UOM}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formCost" className="mb-3">
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="Cost"
                                            placeholder="Enter cost"
                                            value={productData.Cost}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formWholeSale" className="mb-3">
                                        <Form.Label>Wholesale Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="WholeSale"
                                            placeholder="Enter wholesale price"
                                            value={productData.WholeSale}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formRetail" className="mb-3">
                                        <Form.Label>Retail Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="Retail"
                                            placeholder="Enter retail price"
                                            value={productData.Retail}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formCash" className="mb-3">
                                        <Form.Label>Cash Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="Cash"
                                            placeholder="Enter cash price"
                                            value={productData.Cash}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formService" className="mb-3">
                                        <Form.Label>Service Charges</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="service_charges"
                                            placeholder="Enter service charges"
                                            value={productData.service_charges}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formPacking" className="mb-3">
                                        <Form.Label>Packing</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Packing"
                                            placeholder="Enter packing details"
                                            value={productData.Packing}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formRack" className="mb-3">
                                        <Form.Label>Rack</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="rack"
                                            placeholder="Enter rack number"
                                            value={productData.rack}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formMinQuantity" className="mb-3">
                                        <Form.Label>Min Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="min_quantity"
                                            placeholder="Enter min qty"
                                            value={productData.min_quantity}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={4}>
                                    <Form.Group controlId="formProductImage" className="mb-3">
                                        <Form.Label>Product Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="product_image"
                                            onChange={handleImageChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>












                            <Button variant="dark" type="submit">
                                Add Product
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddProduct;