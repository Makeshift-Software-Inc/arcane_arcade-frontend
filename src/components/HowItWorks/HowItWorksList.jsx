import React from "react";
import TextAndImg from "./TextAndImg"

const HowItWorksList = ({data}) => {

  return (
 
      data.map((item, i) => {
        return <TextAndImg text={item.text} image={item.img} key={i} odd={i % 2 == 0 ? false : true}/>
      })


  )
}

export default HowItWorksList;
