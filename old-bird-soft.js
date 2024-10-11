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

/**
 * Reactive State aka Signal
 * even work on node.js also
 * core of reactive framwork
 *
 * React killer code: LOC 14
 *
 */
/** @type {<T>(handler?: function) => (state?: T | object) => T} */
export const signal = (handler = () => { }) => (state = {}) => {
  return new Proxy(state, {
    get: (target, prop) => target[prop],
    set: (target, prop, value) => {
      target[prop] = (value !== null && typeof value === 'object')
        ? signal(handler)(value)
        : value
        ;
      handler(target, prop, value);
      return true;
    },
  });
};

/** @type {<T>(handler?: function) => (state?: T | object) => T} */
export const deepSignal = (handler = () => { }) => (state = {}) => {
  const proxy = new Proxy({}, {
    get: (target, prop) => target[prop],
    set: (target, prop, value) => {
      target[prop] = value;
      handler(target, prop, value);
      return true;
    }
  });
  // Object.entries(state).map(([target, value]) => proxy[target] = value);
  Object.entries(state).map(([target, value]) => proxy[target] =
    (value !== null && typeof value === 'object')
      ? signal(console.log)(value)
      : value
  );
  return proxy;
};