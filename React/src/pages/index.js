// import React from 'react';

// const Home = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '90vh'
//       }}
//     >
//       <h1>Home</h1>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from 'react'


 import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

const  Home = () => {
 const[isOpen,setIsOpen] = useState(false)

  const  toggle =()=>{
      setIsOpen(!isOpen)
  }


  return (
    <>
       
       
        {/* <Navbar toggle={toggle}/>  */}
        <HeroSection/>
    </>
  );
}

export default Home;