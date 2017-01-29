// Example
// {
//   name: "some_method",
//   type: "Method",
//   start_line: 0,
//   end_line: 1
// }

export default class FileParser {
  fileText;
  token;
  document;
  lines;
  constructor(fileText, token, document) {
    this.fileText = fileText
    this.lines    = this.fileText.split("\n")
    this.token    = fileText
    this.document = document
  }
  symbol_informations() {
    var blocks = []
    var stack  = []
    this.lines.forEach( (line, index) =>{
      if (this.isBlock(line)){
        var incomplete_block = { name: this.getBlockName(line), start_line: index, type: this.getBlockType(line) }
        stack = [incomplete_block, ...stack]
      }else if(this.isEndBlock(line)){
        let last_block = stack.shift() //remove the last element in the stack and return the last element
        last_block.end_line = index
        blocks = [...blocks, last_block]
      }
    })
    return blocks.filter((block) => block.type == "def")
  }
  isBlock(line) { return /(def |if |do |do\||class)/.test(line) }
  isEndBlock(line){ return /end/.test(line) }
  getBlockType(line){
    if (/def/.test(line))   { return "def" }
    if (/if/.test(line))    { return "condition" }
    if (/do/.test(line))    { return "function" }
    if (/class/.test(line)) { return "class" }
  }
  getBlockName(line) { return line.replace(this.getBlockType(line), "").trim() }
}

// if (this.isOneLineBlock(line)) {
//   block = [...blocks, { name: line, start_line: index, end_line: index }]
// }