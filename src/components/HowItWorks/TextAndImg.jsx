import React from "react";

import gamesPickImg from "./../../img/Games_Pick.svg";
import platformImg from "./../../img/Platform.svg";
import paymentImg from "./../../img/Payment_Method.svg";
import qrImg from "./../../img/QR_Code.svg";
import congratsImg from "./../../img/Congrat.svg";


const TextAndImg = ({
  image, text
}) => {
console.log(image);
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
