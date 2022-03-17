import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import login from '../../images/login.png';
import './signin.css';
import coverMedical from '../../images/coverMedical.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const  Login1 = () =>  {
  return (
    
    < >
       <Link to='/signinPatient'>
       <button type="button" class="btn btn-primary btn-lg">Large</button> 
       </Link>

       <Link to='/signinInsurance'>
       <button type="button" class="btn btn-primary btn-lg">Large</button> 
       </Link>

       <Link to='/signinMedical'>
       <button type="button" class="btn btn-primary btn-lg">Large</button> 
       </Link>

       
      <Container className="mt-5">

     

         <Row >
           <Col lg ={4} md={6} sm ={12} className ='text-center mt-5  p-5'>
              <img className='icon-img' src={login} alt = 'icon'/>
             <Form>
               <Form.Group className='mb-3' controlId='formBasicEmail'>
                 <Form.Control type='email' placeholder='Enter email'/>
               </Form.Group>

               <Form.Group className='mb-3'  controlId='formBasicPassword'>
                 <Form.Control type='password' placeholder='Password'/>
               </Form.Group>
               
               <Button   variant = 'primary btn-block' type = 'submit'> login</Button>
              

             </Form>

           </Col>
           <Col lg = {8} md = {6} sm = {12}>
             <img className = 'w-100' src={coverMedical} alt=''/>
           </Col>
 

         </Row>


      </Container>

    </>
  );
};

export default Login1;