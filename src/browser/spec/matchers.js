import {
  isArray, isFunction, isObject, isString,
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

match.string = () => {
  //TODO: add some options for length and such
  return isString
}

match.or = (...args) => {
  return (val) => {
    return any(args, v => match(v, val))
  }
}

match.falsey = match.or(null, false, undefined);
