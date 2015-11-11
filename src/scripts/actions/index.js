
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT'
export const REFRESH = 'REFRESH';
export const LOAD_MORE_HISTORY = 'LOAD_MORE_HISTORY';


export function loadAccount(address, seed) {
  return {
    type: LOAD_ACCOUNT,
    address,
    seed,
  }
}

export function refresh() {
  return { type: REFRESH };
}

export function loadMoreHistory() {
  return { type: LOAD_MORE_HISTORY };
}
