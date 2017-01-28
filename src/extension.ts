
import * as vscode from 'vscode';

class RubyDocumentSymbolProvider {
  constructor(){ }
  provideDocumentSymbols(document, token){
    var range = new vscode.Range(
      new vscode.Position(0, 0),
      new vscode.Position(0, 0)
    );
    return [
      new vscode.SymbolInformation("Mymethod", vscode.SymbolKind.Method, range),
      new vscode.SymbolInformation("Myclass", vscode.SymbolKind.Class, range)
    ]    
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("ruby symbols active")
  var selector = {
    language: 'ruby',
    scheme: 'file'
  };
  context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(selector, new RubyDocumentSymbolProvider));
}

export function deactivate() {}