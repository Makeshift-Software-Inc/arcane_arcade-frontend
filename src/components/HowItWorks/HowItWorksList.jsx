import React from 'react';
import TextAndImg from './TextAndImg';

const HowItWorksList = ({ data }) => (

  data.map((item, i) => (
    <TextAndImg
      text={item.text}
      image={item.img}
      odd={i % 2 !== 0}
    />
  ))

);

export default HowItWorksList;
