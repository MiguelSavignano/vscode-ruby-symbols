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
      let blockType = this.isBlock(line)
      if (blockType){
        var incomplete_block = { name: this.getBlockName(line, blockType), start_line: index, type: blockType }
        stack = [incomplete_block, ...stack]
      }else if(this.isEndBlock(line)){
        let last_block = stack.shift() //remove the last element in the stack and return the last element
        last_block.end_line = index
        blocks = [...blocks, last_block]
      }
    })
    return blocks.filter((block) => block.type == "def")
  }
  isBlock(line) { 
    return (
      this.isAClassBlock(line)  || this.isAModuleBlock(line)   ||
      this.isAMethodBlock(line) || this.isAFunctionBlock(line) ||
      this.isACaseBlock(line)   || this.isAConditionalBlock(line)
    )
  }
  isEndBlock(line) { return line.trim() == "end" }
  isAClassBlock(line)    { return /class /.test(line) && "class" }
  isAModuleBlock(line)   { return /module /.test(line) && "module" }
  isAMethodBlock(line)   { return /def /.test(line) && "def" }
  isAFunctionBlock(line) { return /(do | do\|)/.test(line) && "do" }
  isACaseBlock(line)     { return /case /.test(line) && "case"}
  isAConditionalBlock(line) { 
    if (/if /.test(line)) { return !/\w/.test(line.split("if")[0]) && "if" }
    else if (/unless /.test(line)) { return !/\w/.test(line.split("unless")[0]) && "unless" }
  }
  getBlockName(line, blockType) {
    if (blockType == "class")  { return line.replace("class", "").trim() }
    if (blockType == "module") { return line.replace("module", "").trim() }
    if (blockType == "def")    { return line.replace("def", "").trim() }
    return undefined
  }
}

const blockTypes = ["class", "module", "def", "do", "if", "unless", "case" ]
