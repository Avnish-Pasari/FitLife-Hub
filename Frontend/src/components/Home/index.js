import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    // Code taken and modified from https://react-bootstrap.github.io/components/navbar/
    <div>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>

            <Navbar.Brand href="/">Toronto Fitness Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">

                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>


                <NavDropdown title="Accounts" id="basic-nav-dropdown">
                  <NavDropdown.Item href="viewprofile">View Profile</NavDropdown.Item>
                  <NavDropdown.Item href="editprofile">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="createpaymentinfo">Create Payment Info</NavDropdown.Item>
                  <NavDropdown.Item href="editpaymentinfo">Edit Payment Info</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="viewclasshistory">Class History</NavDropdown.Item>
                  <NavDropdown.Item href="viewclassschedule">Class Schedule</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="viewpaymenthistory">Payment History</NavDropdown.Item>
                  <NavDropdown.Item href="viewpaymentschedule">Upcoming Payments</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Studios" id="basic-nav-dropdown">
                  <NavDropdown.Item href="inputmap">View All Studios</NavDropdown.Item>
                  <NavDropdown.Item href="filtermap">Filter Studios</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Subscriptions" id="basic-nav-dropdown">
                  <NavDropdown.Item href="viewsubscriptions">View TFC Subscriptions</NavDropdown.Item>
                </NavDropdown>

              </Nav>

            </Navbar.Collapse>

          </Container>
        </Navbar>
      </div>
      <Outlet />
    </div>
  );
}

export default HomePage;