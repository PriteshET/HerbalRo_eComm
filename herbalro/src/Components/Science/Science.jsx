import React from 'react'
import './Science.css' 
import first from '../../assets/1.jpg'
import second from '../../assets/2.jpg'
import result from '../../assets/proresult.jpg'

const Science = () => {
  return (
    <div className='products'>
        <div className="product">
            <img src={first}></img>
            <div className='text'>
                <h2>Microscopic Marvel: The Spirulina Structure</h2>
                <p>What you see is the intricate spiral filament structure of Spirulina — a blue-green algae known 
                    for its rich protein content and antioxidant power. Its unique shape helps it thrive in high-alkaline 
                    waters and contributes to its exceptional nutrient profile.</p>
            </div>
        </div>
        <div className="product">
            <img src={second}></img>
            <div className='text'>
                <h2>Pure Spirulina Powder: Nature's Green Superfood</h2>
                <p>Harvested from clean, mineral-rich water sources, this deep green powder is packed with protein, iron, and 
                    essential vitamins. Just a spoonful a day supports energy, immunity, and overall wellness — the natural way.</p>
            </div>
        </div>
        <div className="product">
            <img src={result}></img>
            <div className='text'>
                <h2>Deliciously Healthy: Spirulina in Every Sip</h2>
                <p>Blend your way to better health! Add spirulina to smoothies for a refreshing, nutrient-dense boost. It's an 
                easy and tasty way to enjoy the benefits of this green superfood — with no compromise on flavor.</p>
            </div>
        </div>
    </div>
  )
}

export default Science