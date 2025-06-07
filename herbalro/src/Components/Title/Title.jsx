import React from 'react'
import "./Title.css"
const Title = ({title,subtitle}) => {
  return (
    <div className='title'>
        <h2>{title}</h2>
        <p>{subtitle}</p>
    </div>
  )
}

export default Title