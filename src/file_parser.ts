interface ICodeBlock {
  name: string;
  type: string;
  startLine: number;
  endLine?: number;
}

interface ICodeBlockComplete {
  name: string;
  type: "class" | "def";
  startLine: number;
  endLine: number;
}

export default class FileParser {
  fileText: string;
  lines: Array<string>;

  constructor(fileText, token, document) {
    this.fileText = fileText;
    this.lines = this.fileText.split("\n");
  }
  symbolInformations(): Array<ICodeBlockComplete> {
    let blocks = [];
    let stack = [];
    this.lines.forEach((line, index) => {
      let lineParse = new LineParse(line);
      if (lineParse.isBlock()) {
        let blockType = lineParse.getBlockType();
        const incompleteBlock: ICodeBlock = {
          name: lineParse.getBlockName(blockType),
          startLine: index,
          type: blockType
        };
        stack = [incompleteBlock, ...stack];
      } else if (lineParse.isEndBlock()) {
        let lastBlock = stack.shift(); //remove the last element in the stack and return the last element
        if (!lastBlock) return console.log("current stack", stack);
        lastBlock.endLine = index;
        blocks = [...blocks, lastBlock];
      }
    });
    return this.getPermitedBlocks(blocks);
  }

  getPermitedBlocks(blocks) {
    return blocks.filter(
      block =>
        block.endLine && _.includes(["def", "class", "module"], block.type)
    );
  }
}

const blockTypes = [
  "class",
  "module",
  "def",
  "do",
  "if",
  "unless",
  "case",
  "begin",
  "scope"
];

class LineParse {
  line;
  constructor(line) {
    this.line = line;
  }
  isAClassBlock() {
    return /class /.test(this.line);
  }
  isAModuleBlock() {
    return /module /.test(this.line);
  }
  isAMethodBlock() {
    return /def /.test(this.line);
  }
  isAFunctionBlock() {
    return this.line.split(" ").some(word => word == "do");
  }
  isACaseBlock() {
    return /case /.test(this.line);
  }
  isAExceptionHandlerBlock() {
    return /( begin|begin )/.test(this.line);
  }
  isAConditionalBlock() {
    if (/if /.test(this.line)) {
      return !/\w/.test(this.line.split("if")[0]);
    } else if (/unless /.test(this.line)) {
      return !/\w/.test(this.line.split("unless")[0]);
    }
  }
  isBlock() {
    return (
      this.isAClassBlock() ||
      this.isAModuleBlock() ||
      this.isAMethodBlock() ||
      this.isAFunctionBlock() ||
      this.isACaseBlock() ||
      this.isAConditionalBlock() ||
      this.isAExceptionHandlerBlock()
    );
  }
  getBlockType() {
    if (this.isAClassBlock()) {
      return "class";
    }
    if (this.isAModuleBlock()) {
      return "module";
    }
    if (this.isAMethodBlock()) {
      return "def";
    }
    if (this.isAFunctionBlock()) {
      return "do";
    }
    if (this.isACaseBlock()) {
      return "case";
    }
    if (this.isAConditionalBlock()) {
      return "if";
    }
    if (this.isAExceptionHandlerBlock()) {
      return "begin";
    }
    return undefined;
  }
  isEndBlock() {
    return this.line.trim() == "end";
  }
  getBlockName(blockType) {
    if (blockType == "class") {
      return this.line.replace("class", "").trim();
    }
    if (blockType == "module") {
      return this.line.replace("module", "").trim();
    }
    if (blockType == "def") {
      return this.line.replace("def", "").trim();
    }
    return undefined;
  }
}

const _ = {
  includes: (array, value) => array.indexOf(value) != -1
};
