// Example
// {
//   name: "MyClass",
//   type: "Method",
//   rage:{
//       x: {
//         line: 0,
//         character: 0,   
//       },
//       y: {
//         line: 0,
//         character: 0,   
//       },
//   }
// }

export default class FileParser {
  constructor(fileText, token, document) {}
  symbol_informations() {
    return [{
      name: "MyClass",
      type: "Class",
      rage: {
        x: {
          line: 0,
          character: 0,
        },
        y: {
          line: 0,
          character: 0,
        },
      }
    }]
  }
}