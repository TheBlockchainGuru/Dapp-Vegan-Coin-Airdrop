import { Navbar, Container, Nav , NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const pathname = useLocation().pathname
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={require('../assets/img/logo.webp').default } />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            <Link to="/home1" className={pathname == '/home1' ? 'active nav-link' : 'nav-link'}>New Home</Link>
                            <Link to="/home" className={pathname == '/home' ? 'active nav-link' : 'nav-link'}>Home</Link>
                            <Nav.Link href="#home">
                                <img src={require('../assets/img/twitter.svg').default} />
                            </Nav.Link>
                            <Nav.Link href="#home">
                                <img src={require('../assets/img/icon1.svg').default} />
                            </Nav.Link>
                            <Nav.Link href="#home">
                                <img src={require('../assets/img/icon2.svg').default} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;