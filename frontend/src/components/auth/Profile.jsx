import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../slices/authSlice';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button, Alert, Image } from 'react-bootstrap';
import defaultProfile from '../../assets/default-profile.png';

const Profile = () => {
    const dispatch = useDispatch();
    const { userInfo, isLoading, error } = useSelector((state) => state.auth);
    const { register, handleSubmit, setValue } = useForm();

    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureName, setProfilePictureName] = useState('');

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (userInfo) {
            setValue('fname', userInfo.fname || '');
            setValue('lname', userInfo.lname || '');
            setValue('email', userInfo.email || '');
            setValue('mobileno', userInfo.mobileno || '');
            setValue('cnic', userInfo.cnic || '');
            setValue('dob', userInfo.dob ? formatDate(userInfo.dob) : '');
            setValue('role', userInfo.role || '');
            setValue('gender', userInfo.gender || '');
            setProfilePicture(userInfo.profilePicture || defaultProfile);
            setProfilePictureName(userInfo.profilePicture ? userInfo.profilePicture.split('/').pop() : '');
        }
    }, [userInfo, setValue]);

    const onSubmit = async (data) => {
        const updatedData = { ...data };
        if (profilePicture instanceof File) {
            updatedData.profilePicture = profilePicture;
        } else {
            updatedData.profilePicture = userInfo.profilePicture; // Ensure the existing picture URL is retained
        }
        await dispatch(updateUserProfile(updatedData));
        dispatch(fetchUserProfile()); // Fetch updated data
    };    

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setProfilePictureName(file.name);
    };

    return (
        <div id="main">
            <Container className="mt-4">
                <div className="profile-info pb-4">
                    <h2 className="text-dark mb-3">
                        {userInfo?.fname ? `${userInfo.fname} ${userInfo.lname}'s Profile 👤` : 'User Profile'}
                    </h2>
                    <h5 className="text-secondary">Profile Overview</h5>
                </div>

                <Row>
                    <Col md={6}>
                        <Card className="mt-5" style={{ borderRadius: '15px', backgroundColor: '#424242' }}>
                            <Card.Body className="d-flex gap-3">
                                <div className="flex-shrink-0">
                                <Image
                                    src={profilePicture instanceof File
                                        ? URL.createObjectURL(profilePicture)
                                        : `http://localhost:8080/${profilePicture}`}
                                    alt="Profile"
                                    className="img-fluid rounded-circle"
                                    width="100"
                                    height="100"
                                />
                                </div>
                                <div>
                                    <h5 className="mb-2 text-white"><strong>Name:</strong> {`${userInfo?.fname || ''} ${userInfo?.lname || ''}`}</h5>
                                    <p className="mb-2 text-white"><strong>Email:</strong> {userInfo?.email || 'N/A'}</p>
                                    <p className="mb-2 text-white"><strong>Mobile No:</strong> {userInfo?.mobileno || 'N/A'}</p>
                                    <p className="mb-2 text-white"><strong>CNIC:</strong> {userInfo?.cnic || 'N/A'}</p>
                                    <p className="mb-2 text-white"><strong>Date Of Birth:</strong> {userInfo?.dob ? formatDate(userInfo.dob) : 'N/A'}</p>
                                    <p className="mb-2 text-white"><strong>Gender:</strong> {userInfo?.gender || 'N/A'}</p>
                                    <p className="mb-2 text-white"><strong>Role:</strong> {userInfo?.role || 'N/A'}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="mt-5 bg-white p-4 shadow-lg">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {isLoading && <Alert variant="info">Loading...</Alert>}

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="fname" className="form-floating">
                                            <Form.Control
                                                type="text"
                                                placeholder="First Name"
                                                {...register('fname')}
                                            />
                                            <Form.Label>First Name</Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="lname" className="form-floating">
                                            <Form.Control
                                                type="text"
                                                placeholder="Last Name"
                                                {...register('lname')}
                                            />
                                            <Form.Label>Last Name</Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="profile_picture" className="form-floating mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={handleProfilePictureChange}
                                    />
                                    <Form.Label>Profile Picture</Form.Label>
                                    {profilePictureName && <small className="text-muted">{profilePictureName}</small>}
                                </Form.Group>

                                <Form.Group controlId="email" className="form-floating mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        {...register('email')}
                                    />
                                    <Form.Label>Email</Form.Label>
                                </Form.Group>

                                <Form.Group controlId="mobileno" className="form-floating mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Mobile Number"
                                        {...register('mobileno')}
                                    />
                                    <Form.Label>Mobile Number</Form.Label>
                                </Form.Group>

                                <Form.Group controlId="cnic" className="form-floating mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="CNIC"
                                        {...register('cnic')}
                                        disabled={userInfo?.userRole !== 'admin'}
                                    />
                                    <Form.Label>CNIC</Form.Label>
                                </Form.Group>

                                <Form.Group controlId="dob" className="form-floating mb-3">
                                    <Form.Control
                                        type="date"
                                        placeholder="Date Of Birth"
                                        {...register('dob')}
                                    />
                                    <Form.Label>Date of Birth</Form.Label>
                                </Form.Group>

                                <Form.Group controlId="gender" className="form-floating mb-4">
                                    <Form.Select {...register('gender')}>
                                        <option value="" disabled>Select your gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                    <Form.Label>Gender</Form.Label>
                                </Form.Group>

                                <Button variant="dark" type="submit" className="fw-semibold">Update</Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;