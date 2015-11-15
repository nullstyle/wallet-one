import {each} from "lodash";
import {expect as chaiExpect} from "chai";

let expectBuffer = [];
export function expect(...args) {
  let e = chaiExpect(...args);
  expectBuffer.push(e);
  return e;
}
function finishCase() {
  let result = expectBuffer;
  expectBuffer = [];
  return result;
}


let units = [];
const unit = {
  describe(desc, fn) {
    let contexts = [];
    let context = (desc, fn) => {
      let its = [];
      let it = (desc, fn) => its.push({desc,fn});
      fn(it);
      contexts.push({desc, its});
    }
    fn(context);
    units.push({desc, contexts});
  },
};

const none = () => {};
const component = {
  describe: none,
};
const reducer = {
  describe: none,
};
const actionCreator = {
  describe: none,
};
const match = {
  any: none,
  string: none,
  or: none,
}

export function runUnits() {
  let failures = [];
  each(units, describe => {
    each(describe.contexts, context => {
      each(context.its, it => {
        let kase = {
          describe: describe.desc,
          context: context.desc,
          it: it.desc,
        };
        try {
          // TODO: allow promise return values;
          it.fn();
        } catch(error) {
          let failure = {kase, error}
          failures.push(failure);
        }
      });
    });
  });

  return failures;
}

const t = {unit, component, reducer, actionCreator, expect, match};
export default t;
