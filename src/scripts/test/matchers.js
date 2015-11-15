import {
  isArray, isFunction, isObject,
  map, mapValues,
  any,
} from "lodash";

export default function match(spec, val) {
  if (!spec) return spec === val;

  if (isArray(spec)) {
    return all(spec, s => match(s, val));
  } else if (isFunction(spec.$match)) {
    return spec.$match(val);
  } else if (isObject(spec)) {
    return all(spec, s => match(s, val));
  } else {
    return spec === val;
  }
}

export function or(...args) {
  return (val) => {
    return any(args, v => match(v, val))
  }
}

let falsey = or(null, false, undefined);
export {falsey};
