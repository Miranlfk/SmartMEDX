import React from 'react'
import './LayOut.css';


import Archana from '../Images/Archana.jpg';
import miran2 from '../Images/miran2.jpeg';
import hasindu1 from '../Images/hasindu1.jpeg';
import kavith from '../Images/kavith.jpeg';
import ravindu1 from '../Images/ravindu1.jpeg';

function AboutPage() {
  return (
       <>
          <div className="About">
                  
                    <h1 className="aboutheadmission" >-Our Mission-</h1>
                    <p className="aboutheadmissionpara" >To Provide most efficient Experience to you</p>
                  
                    <h1 className="abouthead">About </h1>
                    SmartMEDX revolutionizing your healthcare! SmartMEDX is a platform built with the vision of changing the healthcare industry's landscape 
                    and pushing the envelope for development in Healthcare integrating Technology.This platform is built with the mission of unifying the corporations involved in the Industry and creating a seemless healthcare 
                    experience for the general public.This system is built on Blockchain using the Solidity platform. Blockchain technology has be chosen to provide a peace of mind for the patients
                    as their details are fully secure within the Blockchain and their details are only given out to verified parties within our Network. 3rd Parties
                    will be verified using the Authentication system set in place and the details will communicated to the relevant parties seemlessly for a more
                    efficient and easy experience.
                    
            
            
          </div>
              
               <h1 className=" titleteam">Our Team</h1>
          

          <div className="team">
            
           
            <div className="teammember">
            <img className="teampicture" src={miran2} alt=''/>
              <div class="descriptionmember">
                <h4 className="names"><b>Miran Kurukulasuriya</b></h4> 
                
              </div>

            </div>
             <div className="teammember">
            <img className="teampicture" src={hasindu1} alt=''/>
              <div class="descriptionmember">
                <h4 className="names"><b>Hasindu Ramanayake</b></h4> 
               
              </div>

            </div>
             <div className="teammember">
            <img className="teampicture" src={Archana} alt=''/>
              <div class="descriptionmember">
                <h4 className="names"><b>Archana Liyanage</b></h4> 
          
              </div>

            </div>
             <div className="teammember">
            <img className="teampicture" src={kavith} alt=''/>
              <div class="descriptionmember">
                <h4 className="names"><b>Kavith Jayasuriya</b></h4> 
                
              </div>

            </div>
             <div className="teammember">
            <img className="teampicture" src={ravindu1} alt=''/>
              <div class="descriptionmember">
                <h4 className="names"><b>Ravindu Lakshitha</b></h4> 
                 
              </div>

            </div>





          </div>


  </>          
  );      
};
    
   
   
 
export default AboutPage;