import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';

/* istanbul ignore next */
const resizeHandler = function(entries) {
  for (let entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  }
};

/* istanbul ignore next */
export const addResizeListener = function(jade, fn) {
  if (isServer) return;
  if (!jade.__resizeListeners__) {
    jade.__resizeListeners__ = [];
    jade.__ro__ = new ResizeObserver(resizeHandler);
    jade.__ro__.observe(jade);
  }
  jade.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function(jade, fn) {
  if (!jade || !jade.__resizeListeners__) return;
  jade.__resizeListeners__.splice(jade.__resizeListeners__.indexOf(fn), 1);
  if (!jade.__resizeListeners__.length) {
    jade.__ro__.disconnect();
  }
};
