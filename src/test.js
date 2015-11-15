import {each} from "lodash";
import {expect} from "chai";

class Type {
  constructor() {
    this.cases = [];
  }

  describe(desc, fn) {
    let contexts = [];
    let context = (desc, fn) => {
      let its = [];
      let it = (desc, fn) => its.push({desc,fn});
      fn(it);
      contexts.push({desc, its});
    }
    fn(context);
    this.cases.push({desc, contexts});
  }
}

const unit = new Type();
const component = new Type();
const reducer =  new Type();
const actionCreator =  new Type();

const none = () => {};
const match = {
  any: none,
  string: none,
  or: none,
}

export function runUnits() {
  let failures = [];
  eachCase(unit.cases, kase => {
    try {
      // TODO: allow promise return values;
      kase.fn();
    } catch(error) {
      let failure = {kase, error}
      failures.push(failure);
    }
  });

  return {failures};
}

function eachCase(describes, runCaseFn) {
  return each(describes, describe => {
    each(describe.contexts, context => {
      each(context.its, it => {
        runCaseFn({
          describe: describe.desc,
          context: context.desc,
          it: it.desc,
          fn: it.fn,
        });
      });
    });
  });
}

const t = {unit, component, reducer, actionCreator, expect, match};
export default t;
