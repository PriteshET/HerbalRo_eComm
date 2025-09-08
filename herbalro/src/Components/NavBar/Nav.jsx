import React, { useEffect, useState } from 'react'
import './Nav.css'
import logo from '../../assets/logonew.png'
import { Link as ScrollLink} from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Nav = () => {

    const [sticky, setSticky] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setSticky(true): setSticky(false);
        })
    },[])
    return (
        <nav className={sticky ? 'dark-nav' : ''}>
            <div className="container">
                <ScrollLink to='hero' smooth={true} offset={0} duration={500}>
                    <img className='logo' src={logo} alt='logo'></img>
                </ScrollLink>
                <ul className='nav-menu'>
                    <li><ScrollLink to='hero' smooth={true} offset={0} duration={500}><RouterLink to='/'>Home</RouterLink></ScrollLink></li>
                    <li><ScrollLink to='products' smooth={true} offset={-180} duration={500}>Science</ScrollLink></li>
                    <li><RouterLink to='/shop'>Shop</RouterLink></li>
                    <li><ScrollLink to='about-us' smooth={true} offset={0} duration={500}>About Us</ScrollLink></li>
                </ul>
            </div>
        </nav>
);

} 

export default Nav