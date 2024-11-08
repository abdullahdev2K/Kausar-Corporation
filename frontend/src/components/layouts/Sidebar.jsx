import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // import useSelector to access the Redux state
import { fetchUserProfile, logoutUser } from '../../slices/authSlice.js'; // import the async thunk
import defaultProfile from '../../assets/default-profile.png';

const Sidebar = () => {
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Access the user profile from the Redux store
    const { userInfo } = useSelector((state) => state.auth); // Correctly access userInfo

    useEffect(() => {
        // Dispatch the fetchUserProfile thunk to get user data from the backend
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const toggleSubmenu = (index) => {
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    const handleLogout = async () => {
        await dispatch(logoutUser()); // Dispatch the logout action
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <div id="mySidebar" className="sidebar gradient-background">
            <ul className="nav flex-column list-unstyled" id="nav_accordion">
                <div className="profile-picture-container text-center px-3 py-4 d-flex gap-4 align-items-sm-center">
                {/* // Update to use userInfo */}
                    <img
                        src={userInfo?.profilePicture ? `http://localhost:8080/${userInfo.profilePicture}` : defaultProfile}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        width={60}
                        height={60}
                    />
                    <h5 className="text-white m-0" style={{fontSize:16}}>
                        {userInfo?.fname && userInfo?.lname ? `${userInfo.fname} ${userInfo.lname}` : 'User'}
                    </h5>
                </div>
                <li className="nav-item">
                    <Link to="/" className="nav-link fw-semibold">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20}>
                                <path fill="#ffffff" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                        </span>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(1)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                <path fill="#ffffff" d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z" />
                            </svg>
                        </span>
                        Invoice
                        <span className="dropdown-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 1 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="#">Add new Sales Invoice</Link></li>
                        <li><Link className="nav-link" to="#">Manage Sales Invoices</Link></li>
                        <li><Link className="nav-link" to="../src/add-purchase.php">Add new Purchase Invoice</Link></li>
                        <li><Link className="nav-link" to="../src/purchases.php">Manage Purchase Invoices</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(2)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={20} height={20}>
                                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                                <path fill="#ffffff" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                            </svg>
                        </span>
                        Customers
                        <span className="dropdown-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 2 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="/add-customer">Add new Customer</Link></li>
                        <li><Link className="nav-link" to="/customers">Manage Customers</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(3)}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M383.5 192c.3-5.3 .5-10.6 .5-16c0-51-15.9-96-40.2-127.6C319.5 16.9 288.2 0 256 0s-63.5 16.9-87.8 48.4C143.9 80 128 125 128 176c0 5.4 .2 10.7 .5 16H240V320H208c-7 0-13.7 1.5-19.7 4.2L68.2 192H96.5c-.3-5.3-.5-10.6-.5-16c0-64 22.2-121.2 57.1-159.3C62 49.3 18.6 122.6 4.2 173.6C1.5 183.1 9 192 18.9 192h6L165.2 346.3c-3.3 6.5-5.2 13.9-5.2 21.7v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V368c0-7.8-1.9-15.2-5.2-21.7L487.1 192h6c9.9 0 17.4-8.9 14.7-18.4C493.4 122.6 450 49.3 358.9 16.7C393.8 54.8 416 112.1 416 176c0 5.4-.2 10.7-.5 16h28.3L323.7 324.2c-6-2.7-12.7-4.2-19.7-4.2H272V192H383.5z" />
                        </svg>
                        </span>
                        Suppliers
                        <span className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 3 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="/add-supplier">Add new Supplier</Link></li>
                        <li><Link className="nav-link" to="/suppliers">Manage Suppliers</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(4)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20}>
                                {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                <path fill="#ffffff" d="M248 0L208 0c-26.5 0-48 21.5-48 48l0 112c0 35.3 28.7 64 64 64l128 0c35.3 0 64-28.7 64-64l0-112c0-26.5-21.5-48-48-48L328 0l0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80zM64 256c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-128c0-35.3-28.7-64-64-64l-40 0 0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80-40 0zM352 512l160 0c35.3 0 64-28.7 64-64l0-128c0-35.3-28.7-64-64-64l-40 0 0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80-40 0c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2l0 160c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"/>
                            </svg>
                        </span>
                        Products
                        <span className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 4 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="/add-product">Add new Product</Link></li>
                        <li><Link className="nav-link" to="/products">Manage Products</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(5)}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
                        </span>
                        Categories
                        <span className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 5 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="/add-category">Add new Category</Link></li>
                        <li><Link className="nav-link" to="/categories">Manage Categories</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(6)}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z" />
                        </svg>
                        </span>
                        Reports
                        <span className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 6 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="#">Purchase Report</Link></li>
                        <li><Link className="nav-link" to="#">Sales Report</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu">
                    <Link to="#" className="nav-link fw-semibold" onClick={() => toggleSubmenu(7)}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                        </svg>
                        </span>
                        Roles
                        <span className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 7 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="/add-role">Add new Role</Link></li>
                        <li><Link className="nav-link" to="/roles">Manage Roles</Link></li>
                    </ul>
                </li>
                <li className="nav-item has-submenu" onClick={() => toggleSubmenu(8)}>
                    <Link to="#" className="nav-link fw-semibold" >
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                        </svg>
                        </span>
                        Users
                        <span className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={12} height={12}>{/*!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        </span>
                    </Link>
                    <ul className={`submenu collapse list-unstyled ${openSubmenu === 8 ? 'show' : ''}`}>
                        <li><Link className="nav-link" to="/add-user">Add new User</Link></li>
                        <li><Link className="nav-link" to="/users">Manage Users</Link></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link fw-semibold">
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                        </span>
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="" className="nav-link fw-semibold" onClick={handleLogout}>
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}>
                            {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                        </svg>
                        </span>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar