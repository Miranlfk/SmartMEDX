
import React from 'react';
import Video from '../../videos/video.mp4';
import './HeroSection.css';
import removebg from '../../images/removebg.png'


const  HeroSection= () => {
 
   return (
    //  <HeroContainer>
    //        <HeroBg>
    //          <VideoBg autoPlay loop muted src = {Video} type= 'video/mp4' />
              
    //        </HeroBg>
         

    //  </HeroContainer>
       <>

      <div className='video-wrapper'>
   
           <video  autoPlay loop muted className='vi'>
             
             
            <source src = {Video} type = "video/mp4"/>
             
            </video>
 
            <div className='video-description'>
               <img class="img-responsive" width="60%" height="65%"  alt="Codeconvey" scale="0"  src={removebg} alt=''/>

            </div> 
      </div>

     </>
 
  );
};

export default HeroSection;