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
      const { name, type, rage} = symbol_information
      const symbolKinds = {
          Class: SymbolKind.Class,
          Method: SymbolKind.Method,
      }
      var _rage = new Range( new Position(rage.x.line, rage.x.character), new Position(rage.y.line, rage.y.character) );
      return new SymbolInformation(name, symbolKinds[type], _rage)
    })
  }
}
