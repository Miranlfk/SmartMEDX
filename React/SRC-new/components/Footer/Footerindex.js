import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinksItems,
    FooterLinkTitle,
    FooterLink,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
} from "./FooterElements";

const Footer = () => {
    const toggleHome = ()=> {
        scroll.scrollToTop();
    };
  return (
    <FooterContainer>
        <FooterWrap>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                <FooterLinksItems>
                    <FooterLinkTitle> About US </FooterLinkTitle>
                        
                        {/* <FooterLink to="/">How it works</FooterLink>
                        <FooterLink to="/">Testimonials</FooterLink>
                        <FooterLink to="/">Careers</FooterLink>
                        <FooterLink to="/">Investors</FooterLink>
                        <FooterLink to="/">Terms of Services</FooterLink> */}
                    
                </FooterLinksItems>
                <FooterLinksItems>
                    <FooterLinkTitle> Contact US </FooterLinkTitle>
                        
                        {/* <FooterLink to="/">Contact</FooterLink>
                        <FooterLink to="/">Support</FooterLink>
                        <FooterLink to="/">Destinations</FooterLink>
                        <FooterLink to="/">Sponserships</FooterLink> */}
                        
                    
                </FooterLinksItems>
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                <FooterLinksItems>
                    <FooterLinkTitle> Videos </FooterLinkTitle>
                        
                        {/* <FooterLink to="/signin">Submit Video</FooterLink>
                        <FooterLink to="/signin">Ambassadors</FooterLink>
                        <FooterLink to="/signin">Agency</FooterLink>
                        <FooterLink to="/signin">Influencer</FooterLink> */}
                        
                    
                </FooterLinksItems>
                <FooterLinksItems>
                    <FooterLinkTitle> Social Media </FooterLinkTitle>
                        
                        {/* <FooterLink to="/signin">Instagram</FooterLink>
                        <FooterLink to="/signin">Facebook</FooterLink>
                        <FooterLink to="/signin">Youtube</FooterLink>
                        <FooterLink to="/signin">Twitter</FooterLink>
                         */}
                    
                </FooterLinksItems>
                </FooterLinksWrapper>

            </FooterLinksContainer>
            <SocialMediaWrap>
                <SocialLogo to='/' onClick={toggleHome}>SmartMedX</SocialLogo>
                <WebsiteRights>SmartMedX © {new Date().getFullYear()}
                        All rights reserved.</WebsiteRights>
                <SocialIcons>
                    <SocialIconLink href="/" target="_blank" aria-label='Facebook'>
                        <FaFacebook/></SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label='Instagram'>
                        <FaInstagram/></SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label='Youtube'>
                        <FaYoutube/></SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label='Twitter'>
                        <FaTwitter/></SocialIconLink>
                        <SocialIconLink href="/" target="_blank" aria-label='Linkedin'>
                        <FaLinkedin/></SocialIconLink>
                </SocialIcons>

            </SocialMediaWrap>
        </FooterWrap>

    </FooterContainer>
  );
};

export default Footer;