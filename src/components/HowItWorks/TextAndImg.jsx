import React from "react";

const TextAndImg = ({
  image, text
}) => {

  return (
    <div className="flex flex-row">
      <div className="image-div">
        <img src={image} alt="div-img" />
      </div>
      <div className="text-div">
        <p>{text}</p>
      </div>
    </div>
  )
}

export default TextAndImg;
