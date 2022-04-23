import React from "react";
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import './LayOut.css';
import { AiOutlineMail } from "react-icons/ai";

import { BsTelephoneInbound } from "react-icons/bs";
const ContactUs = () => {
  return (
  <div className="Contact-UsBackground">
      <Container>
          <Row className="mb-5 mt-3">
              <Col lg = '8' >
                <h1 className="display-4 mb-4">
                    Contact Us
                </h1>
              </Col>
          </Row>

          <Row className="sec_sp">
              <Col lg='5' className="mb-5">
                  <h3 className="color_sec py-4">Get in touch</h3>
                  <address>
                        <strong> <AiOutlineMail size={35}/>  liyanagearchana@gmail.com</strong>
                        
                        <br/>
                        <br/>
                        <p>
                            <strong><BsTelephoneInbound size={30}/> +94760073612</strong>
                        </p>
                   </address>
                   <p>For further Inquiries or technical support you can get in touch with our Developers  through the mail, phone number or send
                      us a message directly in the space provided.
                   </p>

              </Col >

              <Col lg ='5' className="d-flex align-items-center">
                  <form className="contact_form w-100">
                      <Row>
                          <Col lg='6'className="form-group">
                              <input
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder="Name"
                              type="text"
                              />

                          </Col>
                           <Col lg='6'className="form-group">
                              <input
                              className="form-control rounded-0"
                              id="email"
                              name="email"
                              placeholder="Email"
                              type="email"
                              />

                          </Col>
                      </Row>
                      <textarea 
                      className="form-control rounded-0" 
                      id = "message"
                      name="message"
                      placeholder="Message"
                      rows='10'
                      >

                      </textarea>
                      <br/>
                      <Row>
                          <Col lg='12' className="firm-group">
                              <button className="btnn" type="submit">Send</button>
                          </Col>
                      </Row>

                  </form>
              </Col>
          </Row>
      </Container>

</div>
  );
};

export default ContactUs;
