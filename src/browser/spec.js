import {each, reduce, any, isFunction, filter, find} from "lodash";
import {expect} from "chai";
import generate from './spec/generators';
import match from './spec/matchers';
import contracts from './spec/contracts';

var specFns = [];
var subjects = [];
var cases = [];

const none = () => {};
const unit = newType('Unit', runUnit);
const component = newType('Component', none);
const reducer = newType('Reducer', runReducer);
const actionCreator = newType('Action Creator', none);


const x = {
  stellar: {
    amount: none,
  },
};


export function addSpecs(fn) {
  specFns.push(fn);
}

export function loadSpecs() {
  each(specFns, fn => fn(spec));
  makeCases(subjects, () => {});
}

export function runSpecs(category) {
  let toRun = subjects;
  if (category) {
    toRun = filter(toRun, {category})
  }
  makeCases(toRun, kase => {
    console.log("run", kase);
    kase.caseFn(kase);
  });
}

export function runUnit(kase) {
  try {
    // TODO: allow promise return values;
    kase.itFn(kase.subject);
    kase.status = "success";
  } catch(error) {
    kase.status = "failed";
    kase.error = error;
  }
}

export function runReducer(kase) {
  try {
    let reducer   = kase.subject;
    let state     = generate(kase.context.state);
    let action    = generate(kase.context.action);
    let nextState = reducer(state, action);

    kase.itFn(nextState, action, state);
    kase.status = 'success';
  } catch(error) {
    kase.status = "failed";
    kase.error = error;
  }
}


const spec = {
  actionCreator, cases, component, contracts, expect, generate, match, reducer,
  subjects, unit, x,
};
export default spec;


function newType(category, caseFn)  {
  let describe = (desc, fn) => {
    let contexts = [];
    let context = (desc, fn) => {
      let its = [];
      let it = (desc, fn) => its.push({desc,fn});
      if (isFunction(fn)) { fn(it); }
      contexts.push({desc, its});
    }
    fn(context);
    subjects.push({category, desc, contexts, caseFn});
  }
  return {describe};
}

function makeCases(toRun, fn) {
  spec.cases = [];
  return each(spec.subjects, subject => {
    let selected = !!find(toRun, subject);
    each(subject.contexts, context => {
      each(context.its, it => {
        let kase = {
          category: subject.category,
          subject:  subject.desc,
          context:  context.desc,
          it:       it.desc,
          caseFn:   subject.caseFn,
          itFn:     it.fn,
        }
        if (selected) { fn(kase); }
        spec.cases.push(kase);
      });
    });
  });
}
