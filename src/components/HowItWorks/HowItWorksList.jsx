import React from "react";
import TextAndImg from "./TextAndImg"

const HowItWorksList = ({data}) => {
  console.log(data);

  return (
 
      data.map((item, i) => {
        return <TextAndImg text={item.text} image={item.img} />
      })


  )
}

export default HowItWorksList;
