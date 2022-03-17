import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './OptionPagePatient.css';
import { ImProfile } from "react-icons/im";

function OptionPatient() {
  return (

<>
    <div className='cover'>

                  
                  <button type="button" class="btn btn-primary" className='signout'>  Sign Out</button>
                 
           <div className='details'>




            </div>
          
          <div className='option-wrapper'>
            
                
                <div className='records'>
                    <h5 className='topic'> View Health Records</h5>
                    <ImProfile size={120} className="aaaa"/>
                    
                    <div class="d-grid gap-2">
                      <button className='HOD'>  History of Diagnosis</button>
                      <button className='LR' >  Laboratory results </button>
                    </div>
                
                </div>

            
                
                <div className='history'>
                    <h4 className='topic-2'>View Transaction History</h4>
                    <ImProfile size={120} className="aaaa"/>
                    
                    <button className='VTH'> click </button>


                </div>





          </div>




 </div>

</>
  );
};

export default OptionPatient;