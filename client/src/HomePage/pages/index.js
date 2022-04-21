import React, {useState} from 'react';
import Footer from '../components/Footer';
import Herosection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/Data';
import Services from '../components/Services';




const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
                
        <Herosection/>
        <InfoSection{...homeObjOne}/>
        <InfoSection{...homeObjTwo}/>
        <Services/>
        <InfoSection{...homeObjThree}/>
        <Footer/>
        
        
    </>
  );
};

export default Home;