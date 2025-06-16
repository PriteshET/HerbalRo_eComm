import React from 'react'
import './Footer.css'
import insta from '../../assets/instagram.png'
import face from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import mobile from '../../assets/phone.png'
import tele from '../../assets/telephone.png'
import mail from '../../assets/mail.png'
import amazon from '../../assets/amazon.png'
import flipkart from '../../assets/flipkart.png'
import { Link as ScrollLink} from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';


const Footer = () => {
  return (
    <span>
      <div className='footer'>
        <div className="section">
            <h3><RouterLink to='/shop'>Shop</RouterLink></h3>
            <ul>
              <li><RouterLink to='/shop'>Powders</RouterLink></li>
              <li><RouterLink to='/shop'>Tablets</RouterLink></li>
              <li><RouterLink to='/shop'>Capsules</RouterLink></li>
            </ul>
        </div>
        <div className="section">
          <h3>About</h3>
            <ul>
              <li><ScrollLink to='about-us' smooth={true} offset={0} duration={500}>About Us</ScrollLink></li>
              <li><ScrollLink to='contact' smooth={true} offset={-220} duration={500}>Contact Us</ScrollLink></li>
            </ul>
        </div>
        <div className="section">
          <h3>Your Account</h3>
            <ul>
              <li><RouterLink to='/login'>Login</RouterLink></li>
              <li><RouterLink to='/shop'>Orders</RouterLink></li>
              <li><RouterLink to='/shop/cart'>Your Cart</RouterLink></li>
            </ul>
        </div>
        <div className="section">
          <h3>Get in Touch</h3>
            <ul>
              <li><img src={tele}/>022-12345678</li>
              <li><img src={mobile}/>+91 9876543210</li>
              <li><img src={mail}/>herbalro123@gmail.com</li>
            </ul>
        </div>
        
        <div className="section">
          <h3>We Are Also Available On:</h3>
            <ul>
              <li><img src={amazon}/><a href="https://www.amazon.in/stores/Kapiva/page/169D3D0F-2140-4132-91B6-A2CC15C5D84C?is_byline_deeplink=true&deeplink=169D3D0F-2140-4132-91B6-A2CC15C5D84C&redirect_store_id=169D3D0F-2140-4132-91B6-A2CC15C5D84C&lp_asin=B0DQDFZGCP&ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto" 
                target='_blank'>Amazon.in</a></li>
              <li><img src={flipkart}/><a href='https://www.flipkart.com/health-care/health-supplements/vitamin-supplement/kapiva~brand/pr?sid=hlc,etg,qtw&marketplace=FLIPKART&otracker=product_breadCrumbs_Kapiva+Vitamin+Supplement'
                target='_blank'>Flipkart.com</a></li>
            </ul>
        </div>
        <div className="section" id='follow'>
          <h3>Follow Us</h3>
          <ul>
            <li><img src={insta}/></li>
            <li><img src={face}/></li>
            <li><img src={twitter}/></li>
            </ul>
              
        </div>
      </div>
      <div className="footer2">
        <p>&#169; 2025 Herbalro. All rights Reserved.</p>
        <ul>
          <li>Terms of Services</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </span>
  )
}

export default Footer