  //   O L D - B I R D - S O F T    \\
 //                                  \\
// - - - - - - - - - [ pure web ] - - \\

/** @type {HTMLElement} */
export const monitorView = document.getElementById('monitor');

export const monitor = state => {
  if (!monitorView || monitorView.style.visibility === 'hidden') return;
  try {
    monitorView.innerText = JSON.stringify(state, null, 2);
  } catch (error) {
    console.error(console.error());
    monitorView.innerText = error;
  }
};

/** @type {(ms:number) => Promise<void>} */
// export const delay = (ms) => new Promise((release) => setTimeout(release, ms));
export const delay = (ms) => {
  return new Promise((release) => {
    const start = performance.now();
    const tick = (now) => {
      if (now - start >= ms) {
        release();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
};


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
export const DIRECT = Symbol('direct');

/** @typedef {(root:any, target?: any, prop?:string | Symbol, value?:any) => void} Watcher */

/** @type {<T>(watcher?: Watcher) => (state?: T | object) => T} */
export const zignal = (watcher = () => { }) => (state = {}) => {
  let root;
  /** @type {<T>(state?: T | object) => T} */
  const innerSignal = (state) => { 
    const proxy = new Proxy(
      Array.isArray(state) ? [] : {}, 
      {
        get: (target, prop) => target[prop],
        set: (target, prop, value) => {
          if (target?.[DIRECT]) {
            target[DIRECT](prop, target[prop], value);
          }
          target[prop] = (value !== null && typeof value === 'object' && !value[STATIC] && !value[DIRECT]) 
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

globalThis.zignal = zignal; // TODO remove
globalThis.DIRECT = DIRECT; // TODO remove
globalThis.STATIC = STATIC; // TODO remove

/** @type {(templateId:string, parent:string, id?:string) => HTMLElement | null} */
export const fragment = (templateId, parent, id) => {
  /** @type {HTMLTemplateElement} */
  const tE = document.querySelector(templateId);
  const frag = tE?.content ?  tE.content.cloneNode(true) : null;
  if (frag === null) return null;
  /** @type {HTMLElement} */ 
  const result = frag.querySelector('section');
  if (id) { result.id = id; }
  document.querySelector(parent)?.appendChild(frag);
  return result;
};