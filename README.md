# repro-js 
_no-compile minimal reactive JS Framework_

main goal:
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

## Development start with this bare minimal responsive card game.
```js
/**
 * function:
 * 
 * @type {(State) => void} defined by user
 * - register(state)
 * 
 * @type {(templateString: string) => View}
 * - view`<pre>{{state.name}}</pre>`
 * 
 * @type (State => View, Dependency[]) => ReactiveView
 * - render(effect, []);
 * 
 * @type ((prev:State, Dependency[]) => CloseWatch
 * - watch(prevState => handleNameChange, [state.name]);
 * 
 * @type (saga:SagaGenerator, Dependency[]) => CloseSaga
 * - saga(generator, []); // maybe too complex so can't develop untill really needed
 * 
 * This solution too simple, ultimate simple.
 * 
 * KIHAL -> I have the solution for modular development without compile
 */
```

## problems

- jsDoc seems won't work with 
