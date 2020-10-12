import React from "react";

const TextAndImg = ({
  image, text
}) => {

  return (
    <div className="flex flex-row justify-between image-and-text">
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
