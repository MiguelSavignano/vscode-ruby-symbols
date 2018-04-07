// Example
// {
//   name: "some_method",
//   type: "def",
//   start_line: 2,
//   end_line: 5
// }

class CodeBlock {
  name: String
  type: String
  start_line: Number
  end_line: Number

  isComplete() {
    return this.start_line && this.end_line
  }
}

export default class FileParser {
  fileText;
  lines;
  constructor(fileText, token, document) {
    this.fileText = fileText
    this.lines    = this.fileText.split("\n")
  }
  symbol_informations() {
    var blocks = []
    var stack  = []
    this.lines.forEach( (line, index) =>{
      let lineParse = new LineParse(line)
      if (lineParse.isBlock()){
        let blockType = lineParse.getBlockType()
        var incomplete_block = { name: lineParse.getBlockName(blockType), start_line: index, type: blockType }
        stack = [incomplete_block, ...stack]
      } else if (lineParse.isEndBlock()){
        let last_block = stack.shift() //remove the last element in the stack and return the last element
        if(!last_block) return console.log("current stack",stack)
        last_block.end_line = index
        blocks = [...blocks, last_block]
      }
    })
    return this.getPermitedBlocks(blocks)
  }

  getPermitedBlocks(blocks) {
    return blocks.filter((block) => (
      block.end_line && _.includes(["def", "class", "module"], block.type)
    ))
  }
}

const blockTypes = ["class", "module", "def", "do", "if", "unless", "case", "begin", "scope" ]

class LineParse{
  line;
  constructor(line) { this.line = line }
  isAClassBlock() { return /class /.test(this.line) }
  isAModuleBlock() { return /module /.test(this.line)  }
  isAMethodBlock() { return /def /.test(this.line) }
  isAFunctionBlock() { return this.line.split(" ").some( word => word == "do" ) }
  isACaseBlock() { return /case /.test(this.line) }
  isAExceptionHandlerBlock() { return this.line.trim() == "begin" }
  isAConditionalBlock() {
    if (/if /.test(this.line)) { return !/\w/.test(this.line.split("if")[0]) }
    else if (/unless /.test(this.line)) { return !/\w/.test(this.line.split("unless")[0]) }
  }
  isBlock() {
    return (
      this.isAClassBlock()    || this.isAModuleBlock() || this.isAMethodBlock() ||
      this.isAFunctionBlock() || this.isACaseBlock()   || this.isAConditionalBlock() ||
      this.isAExceptionHandlerBlock()
    )
  }
  getBlockType() {
    if (this.isAClassBlock())      { return "class"  }
    if (this.isAModuleBlock())     { return "module" }
    if (this.isAMethodBlock())     { return "def"    }
    if (this.isAFunctionBlock())   { return "do"     }
    if (this.isACaseBlock())       { return "case"   }
    if (this.isAConditionalBlock()){ return "if" }
    if (this.isAExceptionHandlerBlock()){ return "begin" }
    return undefined
  }
  isEndBlock() { return this.line.trim() == "end" }
  getBlockName(blockType) {
    if (blockType == "class") { return this.line.replace("class", "").trim() }
    if (blockType == "module") { return this.line.replace("module", "").trim() }
    if (blockType == "def") { return this.line.replace("def", "").trim() }
    return undefined
  }
}
const _ = {
  includes: (array, value) => (array.indexOf(value) != -1)
}