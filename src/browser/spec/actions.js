export const SPEC_STATUS_CHANGED = 'SPEC_STATUS_CHANGED';
export function specStatusChanged(cases) {
  return { type: SPEC_STATUS_CHANGED, cases }
}
