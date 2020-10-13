import React from "react";

const TextAndImg = ({
  image, text, odd
}) => {

  return (
    <div className={`flex flex-row justify-between image-and-text ${odd ? 'flex-row-reverse' : ''}`}>

      <div className="image-div">
        <img src={image} alt="div-img" className="image" />
      </div>

      <div className="text-div flex align-center justify-flex-start">
        <p  className="text" >{text}</p>
      </div>

    </div>
  )
}

export default TextAndImg;
