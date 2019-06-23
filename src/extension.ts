// https://code.visualstudio.com/api/references/vscode-api
import { ExtensionContext, languages } from "vscode";
import RubyDocumentSymbolProvider from "./ruby_document_symbol_provider";

export function activate(context: ExtensionContext) {
  console.log("ruby symbols active v 0.1.4");
  debugger;
}

export function deactivate() {}
