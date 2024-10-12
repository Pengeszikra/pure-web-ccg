# repro-js 
_no-compile minimal reactive JS Framework_

## main goal:
- typesafe by jsDoc
- can be using by cdn link
- minimal function numbers
- based on Proxy, <template>, taged template string
- can be coded a Alien Solitare game much lighter than React
- watch is don't belong to view / render
- raise my understandig, how can create this stuff better.
- try the Web Animation API nature way.
- will joining to Pure Web Fundation ??
- I can use of dev-tools full power under development time
- sprite sheet setup are easy, can final touch by dev-tools

## zingnal 

The name is: Z I G N A L :: a gamechanger function;

```js
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
          target[prop] = (value !== null && typeof value === 'object') 
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
```

## Alien Solitare gameplay demo with Zignal

```js
ss = zignal(monitor)(structuredClone(setup))

Object.keys(ss.table).map(key => ss.table[key] = null)

ss.deck = cardCollection.slice(0,11).map(({name,power,type,side}) => [name,power,type,side].join('|') )

ss.table.HERO = ss.deck.shift()

bum = setInterval(() => ss.deck.sort(() => Math.random() > .5 ? -1 : 1),100)

clearInterval(bum)

fillUp = () => ["L1", "L2", "L3", "L4"]
  .filter(slot => !ss.table[slot])
  .map(slot => ss.table[slot] = ss.deck.shift())

fillUp()

enemy = ss.table.L2
ss.fly = enemy;
ss.fly = ss.fly.split('|')
ss.table.L2 = null;
ss.table.HERO = ss.table.HERO.split('|')
ss.table.HERO[1] = + ss.table.HERO[1]
ss.table.HERO[1] -= +ss.fly[1]
ss.table.HERO = ss.table.HERO.join('|')
ss.lost.push(enemy)
ss.lost.push(ss.table.HERO)
ss.table.HERO = null
ss.phases = "THE END"
```

_grug no able see complexity demon, but grug sense presence in code base_
(https://grugbrain.dev/)
