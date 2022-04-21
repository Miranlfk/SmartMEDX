import React from 'react';
import Video from '../videos/video.mp4';
import './LayOut.css';
import removebg from '../images/removebg.png'
import { NavLink } from 'react-router-dom';

const HeroSection = () => {

   return (
     
      <>

         <div className='video-wrapper'>

            <video autoPlay loop muted className='vi'>


               <source src={Video} type="video/mp4" />

            </video>

            <div className='video-description'>
               <img className="img-responsive" width="90%" height="95%" alt="Logo" scale="60%" src={removebg}  />
               
            </div>
            
         </div>

      </>

   );
};

export default HeroSection;