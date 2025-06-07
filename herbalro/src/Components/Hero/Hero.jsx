import React, { useEffect } from 'react'
import './Hero.css'
import mag from '../../assets/down-arrow.png'
import { Link } from 'react-scroll'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3001/')
    .then(result => {console.log(result)
      if(result.data !== "Success"){
        navigate('/login')
      }
    })
  },[])
  return (
    <div className='hero'>
        <div className="hero-text">
            <h1>Discover the Power of Spirulina</h1>
            <p>Pure nutrition from nature — support your health with one of the most nutrient-rich superfoods on the planet. 
            Backed by science, trusted by nature.</p>
            <button className='explore-btn'><Link  className="link-content" to='products' smooth={true} offset={-180} duration={1000}>Explore More<img src= {mag}/></Link></button>
        </div>
    </div>
  )
}
