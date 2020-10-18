import React from 'react';


const SliderInfo = ({ title, text, link, icons }) => (

  <div className="slider-info flex-column justify-between">

    <div className="">
      <h1>{title}</h1>

      <p>
        {text}
      </p>
    </div>
    

    <div className="platform-icons flex-row justify-between">
      {/* eslint-disable-next-line */}
      <a href={link}>Learn More ⟶</a>
      <div className="icons flex-row">
      {

        icons.map((icon, i) => {
          return  <img src={icon} alt="svg-icon" key={i}/>
        })
       
      }
      </div>
    </div>
  </div>

);

export default SliderInfo;