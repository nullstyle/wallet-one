import {each} from "lodash";
import {expect} from "chai";

let testFns = [];

const none = () => {};
const unit = newType();
// const component = newType();
const component = {describe:none};
const reducer =  newType();
const actionCreator = {describe:none};
// const actionCreator =  newType();

const match = {
  any: none,
  string: none,
  or: none,
  falsey: none,
}
const x = {
  stellar: {
    amount: none,
  },
};

export function addTests(testFn) {
  testFns.push(testFn);
}

export function loadTests() {
  each(testFns, fn => fn(t));
}

export function runUnits() {
  let failures = [];
  let successes = [];

  eachCase(unit.cases, kase => {
    try {
      // TODO: allow promise return values;
      kase.fn(kase.subject);
      successes.push({kase});
    } catch(error) {
      let failure = {kase, error}
      failures.push(failure);
    }
  });

  return {failures,successes};
}

export function runReducers() {
  let failures = [];
  let successes = [];

  eachCase(reducer.cases, kase => {
    try {
      let reducer   = kase.subject;
      let state     = makeGenerator(kase.context.state).generate();
      let action    = makeGenerator(kase.context.action).generate();
      let nextState = reducer(state, action);

      kase.fn(nextState, action, state);
      successes.push({kase});
    } catch(error) {
      let failure = {kase, error}
      failures.push(failure);
    }
  });

  return {failures, successes};
}

const t = {unit, component, reducer, actionCreator, expect, match, x};
export default t;

function eachCase(describes, runCaseFn) {
  return each(describes, describe => {
    each(describe.contexts, context => {
      each(context.its, it => {
        runCaseFn({
          subject: describe.subject,
          context: context.desc,
          it: it.desc,
          fn: it.fn,
        });
      });
    });
  });
}
function newType()  {
  let cases = [];

  let describe = (subject, fn) => {
    let contexts = [];
    let context = (desc, fn) => {
      let its = [];
      let it = (desc, fn) => its.push({desc,fn});
      fn(it);
      contexts.push({desc, its});
    }
    fn(context);
    cases.push({subject, contexts});
  }
  return {cases, describe};
}

function makeGenerator(spec) {
  let generate = seed => spec;
  return {generate};
}
