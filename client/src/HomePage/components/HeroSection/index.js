import React, {useState} from 'react';
import Video from '../../../videos/video.mp4';
import { Button } from '../ButtonElements';
import HeroSection from '../../../LayOut/HeroSection';
import {
    HeroContainer, 
    HeroBg, 
    VideoBg,
    HeroContent, 
    HeroH1, 
    
    HeroBtnWrapper, 
    ArrowForward, 
    ArrowRight
    } from './HeroElements';

const Herosection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

  return (
    <HeroContainer id='home'>
        <HeroBg>
              <HeroSection>
                  <VideoBg autoPlay loop muted src={Video} type='C:\Users\Hasindu\demo\ArchiSmartMEDX\react\client\src\videos\video.mp4' />
              </HeroSection>
              
        </HeroBg>
        <HeroContent>
            <HeroH1> The Care You Need, 
                The Compassion You Deserve </HeroH1>
            
            <HeroBtnWrapper>
                <Button to="signup" onMouseEnter= {onHover} onMouseLeave={onHover}
                primary="true" dark="true" smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                Get started {hover ? <ArrowForward/> : <ArrowRight/>}
                </Button>
            </HeroBtnWrapper>
        </HeroContent>
    </HeroContainer>
  );
};

export default Herosection;