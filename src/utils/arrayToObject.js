const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})


export default arrayToObject
