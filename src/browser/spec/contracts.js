import generate, * as generators from './generators';
import match, * as matchers from './matchers';

const contracts = {
  falsey: newContract('falsey'),
  or:     newContract('or', {dynamic: true}),
}

export default contracts;

function newContract(key, options={}) {
  let {dynamic} = options;
  let generate  = generators[key];
  let match     = matchers[key];

  if (dynamic) {
    return (...args) => {
      return {
        $generate: generate(...args),
        $match:    match(...args),
      }
    }
  } else {
    return {generate, match};
  }
}
