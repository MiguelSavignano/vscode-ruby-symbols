import {
  SymbolInformation,
  SymbolKind,
  Range,
  Position
} from 'vscode';
import FileParser from './file_parser'

export default class RubyDocumentSymbolProvider {
  constructor() {}
  provideDocumentSymbols(document, token) {
    let fileText = document.getText()
    let symbol_informations = new FileParser(fileText, token, document).symbol_informations()
    return symbol_informations.map((symbol_information) => {
      const { name, type, start_line, end_line} = symbol_information
      const symbolKinds = {
        "class": SymbolKind.Class,
        "def": SymbolKind.Method,
      }
      var rage = new Range( new Position(start_line, 0), new Position(end_line, 0) );
      return new SymbolInformation(name, symbolKinds[type], rage)
    })
  }
}
