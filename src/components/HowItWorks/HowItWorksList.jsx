import React from "react";
import TextAndImg from "./TextAndImg"

const HowItWorksList = ({data}) => {

  return (
 
      data.map((item, i) => {
        return <TextAndImg text={item.text} image={item.img} key={i}/>
      })


  )
}

export default HowItWorksList;
