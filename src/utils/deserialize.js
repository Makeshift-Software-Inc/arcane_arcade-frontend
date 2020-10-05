export default ({ data, included }) => {
  let deserialized;
  // it's an Array
  if (data.hasOwnProperty("length")) {
    deserialized = data.map((d) => {
      if (d.relationships) {
        Object.keys(d.relationships).forEach((key) => {
          d.attributes[key] = included.find((include) => {
            return (
              include.type === key &&
              include.id === d.relationships[key].data.id
            );
          }).attributes;
        });
      }
      return d.attributes;
    });
  } else {
    // it's an Object
    deserialized = {};
    deserialized[data.type] = data.attributes;
    if (included) {
      Object.keys(data.relationships).reduce((object, key) => {
        const found = included.filter((include) => include.type === key);
        if (found.length > 1) {
          deserialized[data.type][key] = found.map(
            (include) => include.attributes
          );
        } else {
          deserialized[data.type][key] = found[0].attributes;
        }
        return object;
      }, {});
    }
  }

  return deserialized;
};
