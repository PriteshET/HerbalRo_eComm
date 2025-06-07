import React from 'react'
import './About.css'
import spirulinafarm from '../../assets/spirulina-farm.jpg'

const About = () => {
  return (
    <section className="about-us">
        <div className="about-content">
            <div className="about-image">
                <img src={spirulinafarm} alt="Our Spirulina Journey" />
            </div>
            <div className="about-text">
                <h2>Who We Are</h2>
                <p>
                    At GreenEssence, we're passionate about harnessing the power of nature to promote wellness. 
                    Spirulina - our green gold - is the heart of everything we do. From responsibly sourcing to sustainable packaging, 
                    we are committed to offering nutrient-rich spirulina products that support your health and our planet.
                </p>
                <p>
                    Founded by a group of eco-enthusiasts and nutrition experts, we believe in transparency, science-backed benefits, 
                    and making superfoods accessible to everyone. Whether you're a fitness lover, a wellness warrior, or just health-curious, 
                    we've got a green scoop for you.
                </p>
            </div>
        </div>
    </section>

  )
}

export default About