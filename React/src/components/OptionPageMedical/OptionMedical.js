import React from 'react';
import './OptionPageMedical.css';
// import { BsFillBookFill } from "react-icons/bs";
// import { BsFillPeopleFill } from "react-icons/bs";
import { BiCommentEdit } from "react-icons/bi";
import { FcAcceptDatabase } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { IoIosPerson } from "react-icons/io";


function OptionMedical() {
  return (
    <> 
      <div className='cover'>     
         
          <button type="button" class="btn btn-primary"className='signout'>  Sign Out</button>
           
           
          <div className='details'>




          </div>

          <div className='medic-wrapper'>
          
            <div className='search-me'>
              <h5 className='centerhead-1'>Search Patient</h5>
              <IoIosPerson  size={100} className="aaa"/>

            </div>

            <div className='view-health'>
              <h5  className='centerhead-2' >View Health Records</h5>
              {/* <BsFillBookFill/> */}
              <ImProfile size={100} className="aaa"/>
             
              <div class="d-grid gap-2">
                <button type="button" className='HOOD'>  History of Diagnosis</button>
                <button type="button" className='LRR'>  Laboratory results </button>
              </div>

            </div>

            <div className='edit'>
              <h5 className='centerhead-3' >Update Health records</h5>
              <BiCommentEdit size={100} className="aaa"/>
              <button type="button" className='UHR'>  click </button>

            </div>

          </div>
        </div>

</>
  )
}

export default OptionMedical;