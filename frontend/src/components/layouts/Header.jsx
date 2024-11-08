import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = ({ toggleSidebar, siteTitle }) => {
    return (
        <header className="relative gradient-background">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <Navbar>
                        <button id="nav-btn" className="openbtn" onClick={toggleSidebar}>&#9776;</button>
                    </Navbar>
                    <div>
                        <h2 className="site-title mb-0 text-white">{siteTitle}</h2>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;