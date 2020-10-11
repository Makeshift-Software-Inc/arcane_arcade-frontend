import Jsona from 'jsona';

const dataFormatter = new Jsona();

export default (data) => dataFormatter.deserialize(data);
