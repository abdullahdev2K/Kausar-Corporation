import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; // import useSelector to access the Redux state
import { fetchUserProfile } from '../slices/authSlice.js';

const Dashboard = () => {

    const dispatch = useDispatch();

    // Access the user profile from the Redux store
    const { userInfo } = useSelector((state) => state.auth); // Correctly access userInfo

    useEffect(() => {
        // Dispatch the fetchUserProfile thunk to get user data from the backend
        dispatch(fetchUserProfile());
    }, [dispatch]);

    return (
        <div id="main">
            <Container>
                <div className="welcome-dashboard pb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="text-dark mb-3"> {userInfo?.fname && userInfo?.lname ? `${userInfo.fname} ${userInfo.lname}` : 'User'} 👋</h2>
                        <h5 className="text-secondary">Dashboard</h5>
                    </div>
                    <div>
                        <Link to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={30} height={30}>
                                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                <path fill="#111" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <Row className="row-gap-4 row-gap-lg-0 stats-dashboard py-5">
                    <Col sm={12} lg={8}>
                        <Row className="row-gap-4">
                            <Col sm={12} md={6} xxl={4}>
                                <Link to="/customers" className="text-decoration-none text-dark">                                
                                    <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                        <div>
                                            <span className="customers-icon mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={50} height={50}>
                                                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                                <path fill="#ee8f09" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                                                </svg>
                                            </span>
                                            <h6 className="text-secondary">Total Customers</h6>
                                        </div>
                                        <div>
                                            <h2>250</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={12} md={6} xxl={4}>
                                <Link to="/suppliers" className="text-decoration-none text-dark">                                
                                    <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                        <div>
                                        <span className="suppliers-icon mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={50} height={50}>
                                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                            <path fill="#8c52ff" d="M383.5 192c.3-5.3 .5-10.6 .5-16c0-51-15.9-96-40.2-127.6C319.5 16.9 288.2 0 256 0s-63.5 16.9-87.8 48.4C143.9 80 128 125 128 176c0 5.4 .2 10.7 .5 16H240V320H208c-7 0-13.7 1.5-19.7 4.2L68.2 192H96.5c-.3-5.3-.5-10.6-.5-16c0-64 22.2-121.2 57.1-159.3C62 49.3 18.6 122.6 4.2 173.6C1.5 183.1 9 192 18.9 192h6L165.2 346.3c-3.3 6.5-5.2 13.9-5.2 21.7v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V368c0-7.8-1.9-15.2-5.2-21.7L487.1 192h6c9.9 0 17.4-8.9 14.7-18.4C493.4 122.6 450 49.3 358.9 16.7C393.8 54.8 416 112.1 416 176c0 5.4-.2 10.7-.5 16h28.3L323.7 324.2c-6-2.7-12.7-4.2-19.7-4.2H272V192H383.5z" />
                                            </svg>
                                        </span>
                                        <h6 className="text-secondary">Total Suppliers</h6>
                                        </div>
                                        <div>
                                        <h2>10</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={12} md={6} xxl={4}>
                                <Link to="/users" className="text-decoration-none text-dark">                                
                                    <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                        <div>
                                        <span className="users-icon mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={50} height={50}>
                                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                            <path fill="#FF204E" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                                            </svg>
                                        </span>
                                        <h6 className="text-secondary">Total Users</h6>
                                        </div>
                                        <div>
                                        <h2>27</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={12} md={6} xxl={4}>
                                <Link to="/categories" className="text-decoration-none text-dark">                                
                                    <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                        <div>
                                        <span className="categories-icon mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={50} height={50}>
                                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                            <path fill="#0094ff" d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                            </svg>
                                        </span>
                                        <h6 className="text-secondary">Total Categories</h6>
                                        </div>
                                        <div>
                                        <h2>7</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={12} md={6} xxl={4}>
                                <Link to="/products" className="text-decoration-none text-dark">                                
                                    <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                        <div>
                                        <span className="medicines-icon mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={50} height={50}>
                                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                            <path fill="#e8bf39" d="M614.3 247c16.3-25 25.7-54.9 25.7-87C640 71.6 568.4 0 480 0c-32.1 0-61.9 9.4-87 25.7c-7.9 5.2-8.5 16.2-1.8 22.9L591.4 248.8c6.7 6.7 17.8 6.2 22.9-1.8zM567 294.3c7.9-5.2 8.5-16.2 1.8-22.9L368.6 71.2c-6.7-6.7-17.8-6.2-22.9 1.8c-16.3 25-25.7 54.9-25.7 87c0 88.4 71.6 160 160 160c32.1 0 61.9-9.4 87-25.7zM301.5 368H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5c2-9.3-5.5-17.5-15-17.5zm0-32c9.5 0 16.9-8.2 15-17.5C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5z" />
                                            </svg>
                                        </span>
                                        <h6 className="text-secondary">Total Medicines</h6>
                                        </div>
                                        <div>
                                        <h2>45</h2>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col sm={12} md={6} xxl={4}>
                                <a href="#" className="text-decoration-none text-dark">                                
                                <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                    <div>
                                    <span className="expired-icon mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={50} height={50}>
                                        {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                        <path fill="#d2666b" d="M614.3 247c16.3-25 25.7-54.9 25.7-87C640 71.6 568.4 0 480 0c-32.1 0-61.9 9.4-87 25.7c-7.9 5.2-8.5 16.2-1.8 22.9L591.4 248.8c6.7 6.7 17.8 6.2 22.9-1.8zM567 294.3c7.9-5.2 8.5-16.2 1.8-22.9L368.6 71.2c-6.7-6.7-17.8-6.2-22.9 1.8c-16.3 25-25.7 54.9-25.7 87c0 88.4 71.6 160 160 160c32.1 0 61.9-9.4 87-25.7zM301.5 368H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5c2-9.3-5.5-17.5-15-17.5zm0-32c9.5 0 16.9-8.2 15-17.5C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5z" />
                                        </svg>
                                    </span>
                                    <h6 className="text-secondary">Expired Medicines</h6>
                                    </div>
                                    <div>
                                    <h2>0</h2>
                                    </div>
                                </div>
                                </a>
                            </Col>
                            <Col sm={12} md={6} xxl={4}>
                                <a href="#" className="text-decoration-none text-dark">                                
                                <div className="bg-white d-flex py-5 px-4 justify-content-between shadow stats h-100 rounded-3">
                                    <div>
                                    <span className="stock-icon mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={50} height={50}>
                                        {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                        <path fill="#ef00a0" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                                        </svg>
                                    </span>
                                    <h6 className="text-secondary">Out Of Stock</h6>
                                    </div>
                                    <div>
                                    <h2>150</h2>
                                    </div>
                                </div>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} lg={4} className='gap-4 d-flex flex-column'>
                        <div className="py-4 px-3 bg-white shadow">
                            <h5 className="text-dark mb-3 fw-bold">Today's Report</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-borderless table-secondary align-middle">
                                <thead className="table-light">
                                    <tr>
                                    <th className="fw-medium">Total Sales</th>
                                    <td className="text-success fw-bold">Rs. 0</td>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    <tr>
                                    <th className="fw-medium">Total Purchase</th>
                                    <td className="text-danger fw-bold">Rs. 0</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="py-4 px-3 bg-white shadow">
                            <h5 className="text-dark mb-3 fw-bold">Monthly Report</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-borderless table-secondary align-middle">
                                    <thead className="table-light">
                                        <tr>
                                        <th className="fw-medium">Total Sales</th>
                                        <td className="text-success fw-bold">Rs. 0</td>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        <tr>
                                        <th className="fw-medium">Total Purchase</th>
                                        <td className="text-danger fw-bold">Rs. 0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="row py-5 row-gap-4 row-gap-lg-0">
                    <div className="col-12 col-md-6 col-lg-4">
                        <a href="#" className="text-decoration-none text-dark">
                        <div className="bg-white py-5 px-3 px-xl-4 p-xxl-5 d-flex flex-column row-gap-4 justify-content-center align-items-center shadow rounded-3 quick-links h-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={35} height={35}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#111" d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z" />
                            </svg>
                            <h6 className="text-dark">Manage Invoices</h6>
                        </div>
                        </a>
                    </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <a href="#" className="text-decoration-none text-dark">
                    <div className="bg-white py-5 px-3 px-xl-4 p-xxl-5 d-flex flex-column row-gap-4 justify-content-center align-items-center shadow rounded-3 quick-links h-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="35px" height="35px">
                        {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                        <path fill="#111" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z" />
                        </svg>
                        <h6 className="text-dark">Manage Sales Report</h6>
                    </div>
                    </a>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <a href="#" className="text-decoration-none text-dark">
                    <div className="bg-white py-5 px-3 px-xl-4 p-xxl-5 d-flex flex-column row-gap-4 justify-content-center align-items-center shadow rounded-3 quick-links h-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="35px" height="35px">
                        {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                        <path fill="#111" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z" />
                        </svg>
                        <h6 className="text-dark">Manage Purchase Report</h6>
                    </div>
                    </a>
                </div>
                </div>
            </Container>
        </div>
    )
}

export default Dashboard;