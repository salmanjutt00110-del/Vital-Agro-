// Single source of truth for app loading state based on sessionStorage flag

let _hasLoaded = false;

export const AppLoadState = {
  get hasLoaded() {
    return _hasLoaded || sessionStorage.getItem('hasVisitedSession') === 'true';
  },
  setLoaded() {
    _hasLoaded = true;
    sessionStorage.setItem('hasVisitedSession', 'true');
  },
  reset() {   // for dev/testing only
    _hasLoaded = false;
    sessionStorage.removeItem('hasVisitedSession');
  }
};
