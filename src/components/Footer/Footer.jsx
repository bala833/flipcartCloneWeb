import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="flipkart-footer">
      <Container>
        <Row>
          <Col md={2} sm={6} className="footer-section">
            <h6>About</h6>
            <ul>
              <li><a href="/">Contact Us</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Careers</a></li>
              <li><a href="/">Press</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="footer-section">
            <h6>Help</h6>
            <ul>
              <li><a href="/">Payments</a></li>
              <li><a href="/">Shipping</a></li>
              <li><a href="/">Cancellation</a></li>
              <li><a href="/">FAQ</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="footer-section">
            <h6>Policy</h6>
            <ul>
              <li><a href="/">Return Policy</a></li>
              <li><a href="/">Terms of Use</a></li>
              <li><a href="/">Security</a></li>
              <li><a href="/">Privacy</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="footer-section">
            <h6>Mail Us:</h6>
            <p>
              MyStore Pvt. Ltd.<br />
              123 Market Street,<br />
              Bengaluru, India<br />
              support@mystore.com
            </p>
          </Col>
          <Col md={3} sm={12} className="footer-section">
            <h6>Registered Office Address:</h6>
            <p>
              123 Tech Park,<br />
              Mumbai, Maharashtra 400001<br />
              CIN: U12345MH2025PTC000000<br />
              Telephone: 1800 000 0000
            </p>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyStore — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
