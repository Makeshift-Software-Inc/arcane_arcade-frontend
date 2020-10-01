export default (data) => {
  // it's an Array
  if (data.hasOwnProperty("length")) {
    return data.map((d) => d.attributes);
  } else {
    // it's an Object
    return data.attributes;
  }
};
