import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Table } from 'react-bootstrap';
import { updateSupplier } from '../../slices/supplierSlice.js';

const UpdateSupplier = () => {
    const location = useLocation();
    const supplier = location.state?.supplier;
    
    const [supplierData, setSupplierData] = useState({
        supplier_name: supplier?.supplier_name || '',
        supplier_urduname: supplier?.supplier_urduname || '',
        primary_contact: supplier?.primary_contact || '',
        secondary_contact: supplier?.secondary_contact || '',
        primary_address: supplier?.primary_address || '',
        secondary_address: supplier?.secondary_address || '',
        city: supplier?.city || '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUrduMapOpen, setIsUrduMapOpen] = useState(false);
    const urduNameFieldRef = useRef(null);

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
            if (
                urduNameFieldRef.current &&
                !urduNameFieldRef.current.contains(event.target)
            ) {
                setIsUrduMapOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'supplier_urduname') {
            setSupplierData({
                ...supplierData,
                [name]: mapToUrdu(value),
            });
            setIsUrduMapOpen(true);
        } else {
            setSupplierData({
                ...supplierData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!supplier) {
            setError('Supplier not found');
            return;
        }

        const updatedSupplier = {
            ...supplierData,
            id: supplier.id,
        };

        dispatch(updateSupplier(updatedSupplier))
            .unwrap()
            .then(() => {
                setSuccess('Supplier updated successfully');
                setTimeout(() => {
                    navigate('/suppliers', { state: { message: 'Supplier updated successfully' } });
                }, 3000);
            })
            .catch((err) => setError(err.message || 'Failed to update supplier'));
    };    

    return (
        <div id="main">
            <Container>
                <Row className="pb-4 d-flex justify-content-between mb-5 suppliers-page-title">
                    <Col>
                        <h2 className="text-dark mb-0">Update Supplier 📦</h2>
                    </Col>
                    <Col className="text-end">
                        <Link to="/suppliers" className="btn btn-dark">View Suppliers</Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="formSupplierName" className="mb-3">
                                        <Form.Label>Supplier Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="supplier_name"
                                            placeholder="Update supplier name"
                                            value={supplierData.supplier_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="formSupplierUrduName" className="mb-3">
                                        <Form.Label>Supplier Urdu Name</Form.Label>
                                        <div ref={urduNameFieldRef}>
                                            <Form.Control
                                                type="text"
                                                name="supplier_urduname"
                                                placeholder="Update supplier Urdu name"
                                                value={supplierData.supplier_urduname}
                                                onChange={handleChange}
                                            />
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
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formPrimaryContact" className="mb-3">
                                        <Form.Label>Primary Contact</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="primary_contact"
                                            placeholder="Update primary contact"
                                            value={supplierData.primary_contact}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formSecondaryContact" className="mb-3">
                                        <Form.Label>Secondary Contact</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="secondary_contact"
                                            placeholder="Update secondary contact"
                                            value={supplierData.secondary_contact}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formPrimaryAddress" className="mb-3">
                                        <Form.Label>Primary Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="primary_address"
                                            placeholder="Update primary address"
                                            value={supplierData.primary_address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formSecondaryAddress" className="mb-3">
                                        <Form.Label>Secondary Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="secondary_address"
                                            placeholder="Update secondary address"
                                            value={supplierData.secondary_address}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formCity" className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            placeholder="Update city"
                                            value={supplierData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="dark" type="submit">
                                Update Supplier
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateSupplier;