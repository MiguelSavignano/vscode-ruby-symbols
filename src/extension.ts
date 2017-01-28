
import { ExtensionContext, languages} from 'vscode';
import RubyDocumentSymbolProvider from './ruby_document_symbol_provider'

export function activate(context: ExtensionContext) {
  console.log("ruby symbols active")
  var selector = {
    language: 'ruby',
    scheme: 'file'
  };
  context.subscriptions.push(languages.registerDocumentSymbolProvider( selector, new RubyDocumentSymbolProvider));
}

export function deactivate() {}