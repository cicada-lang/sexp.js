import { TestCase } from "../../infra/test-case"
import { Lexer } from "../../lexer"
import { Token } from "../../token"

export default class extends TestCase {
  lexer = new Lexer({
    quotes: [
      { mark: "'", symbol: "quote" },
      { mark: ",", symbol: "unquote" },
      { mark: "`", symbol: "quasiquote" },
    ],
    parentheses: [
      { start: "(", end: ")" },
      { start: "[", end: "]" },
      { start: "{", end: "}" },
    ],
    comments: [],
  })

  assertLex(text: string, tokens: Array<Omit<Token, "span">>): void {
    const results = this.lexer
      .lex(text)
      .map(({ kind, value }) => ({ kind, value }))

    this.assertEquals(results, tokens)
  }
}