import React, {useState} from 'react';
import Footer from '../components/Footer/Footerindex';
import Herosection from '../components/HeroSection/HeroSectionindex';
import InfoSection from '../components/InfoSection/InfoSectionindex';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/Data';
import Navbar from '../components/Navbar/Navbarindex';
import Services from '../components/Services/Servicesindex';

import Sidebar from '../components/Sidebar/Sidebarindex';


const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <Navbar toggle={toggle}/>
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