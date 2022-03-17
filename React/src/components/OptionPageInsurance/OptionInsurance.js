import React from 'react';
import './OptionPageInsurance.css';
import { IoIosPerson } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { CgToday } from "react-icons/cg";
import 'bootstrap/dist/css/bootstrap.css';


function OptionInsurance() {
  return (
   <>
      <div className='cover'>
         <button type="button" class="btn btn-primary" className='signout'>  Sign Out</button>

           <div className='details'>




           </div>

                
                 
                  


                <div className='insurance-wrapper'>
               
                
                  <div className='search'>
                    
                    <h5 className='topic-search'>Search Patient</h5>
                    <IoIosPerson  size={100} className="aaaa"/>

                  </div>
                  <div className='request-health'>
                 
                    <h5 className='topic-request'>Request Health Records</h5>
                    <ImProfile size={100} className="aaaa"/>
                     
                     
                    
                  <div class="d-grid gap-2">
                    <button className='HOD' type="button"> History of Diagnosis</button>
                    <button className='LR' type="button">Laboratory results</button>
                  </div>
                  

                
                  </div>
                  <div className='view-history'>
                    <h5 className='topic-view'>View Patient History</h5>
                    <CgToday size={100} className="aaaa"/>
                    <button className='vph'> click here</button>


                  </div>

                </div>
                
          </div>
    </>
  );
};

export default OptionInsurance;