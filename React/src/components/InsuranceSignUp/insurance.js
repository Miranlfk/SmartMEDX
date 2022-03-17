
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Insurance.css';
import {FaUserTie  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiFillFolderAdd } from "react-icons/ai";
import { FaUserInjured } from 'react-icons/fa';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import InsuranceCover from '../../images/InsuranceCover.png'

function Insurance() {



  return (
    <>

    <div className='background'>

    
                        
                    <div className='button-container'>
                       
                        <div className='b1'> 
                        <Link to='/SignUpInsurance'>
                        <button type="button" className ="button-1">  <FaUserTie size={30} /> Insurance
                        </button> 
                        </Link>
                        </div>

                        <div className='b2'>
                        <Link to='/SignUpPatient'>
                        <button type="button" className ="button-2"> <FaUserInjured size={35}/>  Patient</button> 
                        </Link>
                        </div>

                        <div className='b3'>
                        <Link to='/SignUpMedicalTeam'>
                        <button type="button" className ="button-3">  <AiFillFolderAdd size={35}/> Medical</button> 
                        </Link>
                        </div>
                    </div>
                 


               
<Container className="mt-5">

          

<Row >
       <Col lg ={4} md={6} sm ={12} className ='text-center mt-2  p-2'>
           <h3 className='insuranceup-head' > Sign Up Insurance</h3>
               
               
               <Form>
               <Form.Group className='mb-3' controlId='formBasicEmail'>
                   <Form.Control type='email' placeholder='Enter email'/>
               </Form.Group> 

               <Form.Group className='mb-3'  controlId='formBasicPassword'>
                   <Form.Control type='text' placeholder='Full Name'/>
               </Form.Group>

               <Form.Group className='mb-3' controlId='formBasicEmail'>
                   <Form.Control type='text' placeholder='Nic Number'/>
               </Form.Group> 

               <Form.Group className='mb-3' controlId='formBasicEmail'>
                   <Form.Control type='text' placeholder='Contact Number'/>
               </Form.Group> 

               <Form.Group className='mb-3' controlId='formBasicEmail'>
                   <Form.Control type='text' placeholder='Insurance Company'/>
               </Form.Group> 

               <Form.Group className='mb-3' controlId='formBasicEmail'>
                   <Form.Control type='text' placeholder='Employee ID'/>
               </Form.Group> 

               
               
               <Form.Group className='mb-3' controlId='formBasicEmail'>
                   <Form.Control type='text' placeholder='Password'/>
               </Form.Group> 
             
               
               
               
               <Link to='/SignUpMedicalTeam' >  
                    <Button className='next' > Next</Button>
               </Link>
               

               

               </Form>

           </Col>

           <Col lg = {8} md = {6} sm = {12}>
               <img className = 'w-2000' src={InsuranceCover} alt=''/>
           </Col>


   </Row>


</Container>  




              
            
    </div>

</>   
    
    
  )
}

export default Insurance;