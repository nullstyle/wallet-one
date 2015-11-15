import {
  isArray, isFunction, isObject,
  map, mapValues,
  any,
} from "lodash";

export default function generate(spec) {
  if (!spec) return spec;

  if (isArray(spec)) {
    return map(spec, generate);
  } else if (isFunction(spec.$generate)) {
    return spec.$generate();
  } else if (isObject(spec)) {
    return mapValues(spec, generate);
  } else {
    return spec;
  }
}



let falsey = or(null, false, undefined);

export function or(...args) {
  return () => {
    let i = Math.floor(Math.random() * args.length);
    return generate(args[i]);
  }
}

export {falsey};
