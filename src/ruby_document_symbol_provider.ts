// https://code.visualstudio.com/api/references/vscode-api#2449
import {
  SymbolInformation,
  SymbolKind,
  Range,
  Position,
  DocumentSymbolProvider
} from "vscode";
import FileParser from "./file_parser";

export default class RubyDocumentSymbolProvider
  implements DocumentSymbolProvider {
  provideDocumentSymbols(document, token) {
    let fileText = document.getText();
    let symbolInformations = new FileParser(
      fileText,
      token,
      document
    ).symbolInformations();

    return symbolInformations.map(symbolInformation => {
      const { name, type, startLine, endLine } = symbolInformation;
      const symbolKinds = {
        class: SymbolKind.Class,
        def: SymbolKind.Method
      };
      var rage = new Range(
        new Position(startLine, 0),
        new Position(endLine, 0)
      );
      return new SymbolInformation(name, symbolKinds[type], rage);
    });
  }
}
