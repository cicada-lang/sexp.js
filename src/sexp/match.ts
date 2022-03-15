import { PatternExp } from "../pattern"
import { Sexp } from "../sexp"
import * as Sexps from "../sexps"

function matchSymbol(sexp: Sexp): string {
  if (!(sexp instanceof Sexps.Sym)) {
    throw new Error(`I expect the sexp to be a symbol.`)
  }

  return sexp.value
}

function matchString(sexp: Sexp): string {
  if (!(sexp instanceof Sexps.Str)) {
    throw new Error(`I expect the sexp to be a string.`)
  }

  return sexp.value
}

function matchNumber(sexp: Sexp): number {
  if (!(sexp instanceof Sexps.Num)) {
    throw new Error(`I expect the sexp to be a number.`)
  }

  return sexp.value
}

function matchList<A>(sexp: Sexp, matcher: (sexp: Sexp) => A): Array<A> {
  if (sexp instanceof Sexps.Null) {
    return []
  }

  if (sexp instanceof Sexps.Cons) {
    return [matcher(sexp.head), ...matchList(sexp.tail, matcher)]
  }

  throw new Error(`I expect the sexp to be a list.`)
}

function match<A>(
  sexp: Sexp,
  entries: Array<[PatternExp, (results: Record<string, Sexp>) => A]>
): A {
  for (const [pattern, f] of entries) {
    const results = sexp.match(pattern)
    if (results !== undefined) return f(results)
  }

  throw new Error("Pattern mismatch.")
}
