import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'



import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { FcBusinessman } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import InsuranceCover from '../../images/InsuranceCover.png'
import { FaUserInjured } from 'react-icons/fa';
import {FaUserTie  } from 'react-icons/fa';
import { AiFillFolderAdd } from "react-icons/ai";
import user from '../../images/user.png';
import './SignInInsurance.css';


function LogInInsurance() {
  return (
    <>

    
                       <div className='button-container'>
                           
                           <div className='b1'> 
                           <Link to='/SigninInsurance'>
                           <button type="button" className ="button-1">  <FaUserTie size={35}/> Insurance
                           </button> 
                           </Link>
                           </div>

                           <div className='b2'>
                           <Link to='/SigninPatient'>
                           <button type="button" className ="button-2"> <FaUserInjured size={35}/>  Patient</button> 
                           </Link>
                           </div>

                           <div className='b3'>
                           <Link to='/SigninMedical'>
                           <button type="button" className ="button-3">  <iFillFolderAdd size={35}/> Medical</button> 
                           </Link>
                           </div>
                       </div>
            





              
    <Container className="mt-5">

          
       
             <Row >
               <Col lg ={4} md={6} sm ={12} className ='text-center mt-5  p-5'>
               <h3 className='insurance-head'> Sign in  Insurance </h3>
                   <img className='icon-img' src={user} alt = 'icon'/>
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
                       <img className = 'w-100' src={InsuranceCover} alt=''/>
                     </Col>
     

              </Row>


   </Container>

 </>
  
  )
}

export default LogInInsurance;