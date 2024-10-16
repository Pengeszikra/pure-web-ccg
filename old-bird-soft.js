  //   O L D - B I R D - S O F T    \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

const monitorView = document.getElementById('monitor')
export const monitor = state => {
  if (!monitorView) return;
  try {
    monitorView.innerText = JSON.stringify(state, null, 2);
  } catch (error) {
    console.error(console.error());
    monitorView.innerText = error;
  }
};

/** @type {(ms:number) => Promise<void>} */
export const delay = (ms) => new Promise((release) => setTimeout(release, ms));

/**
 * I just think it is so easy,
 * but under the hood this is a bit complicated stuff,
 * need to be figurated how complex really is.
 * problem are started with a multi level reactive state 
 * with a different level watcher :: globalWatcher, prop:watcher
 *
 * KIHAL : the problem of array are solved.
 */
/** @type {<T>(watcher?: function) => (state?: T | object) => T} */
export const signal = (watcher = () => { }) => (state = {}) => {
  return new Proxy(state, {
    get: (target, prop) => target[prop],
    set: (target, prop, value) => {
      target[prop] = (value !== null && typeof value === 'object')
        ? signal(watcher)(value)
        : value
        ;
      watcher(target, prop, value);
      return true;
    },
  });
};

export const STATIC = Symbol('static');

/** @type {<T>(watcher?: function) => (state?: T | object) => T} */
export const zignal = (watcher = () => { }) => (state = {}) => {
  let root;
  /** @type {<T>(state?: T | object) => T} */
  const innerSignal = (state) => { 
    const proxy = new Proxy(
      Array.isArray(state) ? [] : {}, 
      {
        get: (target, prop) => target[prop],
        set: (target, prop, value) => {
          target[prop] = (value !== null && typeof value === 'object' && !value[STATIC]) 
            ? innerSignal(value)
            : value
            ;
          watcher(root, target, prop, value);
          return true;
      }
    });
    Object.entries(state).map(([key, val]) => proxy[key] = val);
    return proxy;
  } 
  const end = innerSignal(state); 
  root = end;
  watcher(end);
  return root;
};

globalThis.zignal = zignal;
globalThis.STATIC = STATIC;