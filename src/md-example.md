# Markdown Test
## Some nice markdown editor is `there`
At this current state this markdown post to be looks likes as I expected.

```html
<header></header>
<main>
</main>
<script>
/** @type {()=>number} */
const foo = () => 42;
</script>
// markdown HERO

const alfa = `Some interesting ${beta = false ? "no" :  "yes" } template-str`

// as you see upper this solution have a problem

  /** @type {(safeCode:string) => string} */
  const syntaxHighlight = safeCode => {
    return encodCodeBlockToSafeHtml(safeCode)
      .replaceAll(/("[^&]*"|`[^&]*`|&apos;[^&]*&apos;)/g, "<st>$1</st>")
      .replaceAll(/(&lt;[^\s|^&]*&gt;)/g, "<wt>$1</wt>")
      .replaceAll(/(&lt;[^\s|^&|^\!]*)(\s+)/g, "<wt>$1</wt>$2")
      .replaceAll(/(\{|\}|\(|\)|\[|\])/g, "<sw>$1</sw>")
      .replaceAll(/(const|let|return|function|var|for|if|while)/g, "<rw>$1</rw>")
      .replaceAll(/(className|class|onClick|onInput|export|import|@type|@typedef|string|number|object)/g, "<ew>$1</ew>")
      .replaceAll(/(\=&gt;|\=|\|)/g, "<uw>$1</uw>")
      .replaceAll(/(\/\/(.*)$)/g, "<rm>$1</rm>")
      .replaceAll(/(\/\*\*[^\*|.]*\*\/)/g, "<jd>$1</jd>")
      .replaceAll(/(&lt;\!--[.|^&]*--&gt;)/g, "<rm>$1</rm>")
    ;
  }
</script>
```

## Syntax Highlight Improving
- First round separate the code to different languages part
- colorize every part separetly
- combine to one syntax


```
/** @type {(matrix: number[])=>number[]} */
const matchLoop = (matrix) => {

}
```

## TODO for today
  - figure out what game will be developed for AWS Game Builder Challenge
    - space travell card game with lot of adventure and game collection
    - space live card game, where you can advanture throught the galaxy to find your planet where you live and base to your quest.  I thik this idea need at least a bunch of month to create, I don't have that many times.
    - Somehow figure out where is the good place the revoicer voicer.
  - figure out a game design, and that at least somehow need to be consistent.
  - alien solitare or 3match game will be working.
  - try at least two or three AWS service for game
  - find a name for this Editor
  - shortkey for editor
  - figure out what cause the problem on `DRSA` admin tool

great story about game developer : [Eric creator of Stardew Valley](https://www.youtube.com/watch?
v=v0OsW8HSqA8)

## Pritify of JS obfuscating
```
(
  ([]**[] + []**[])
          +
  ([]**[] + []**[])
)
          **
(
  ([]**[] + []**[])
          +
  ([]**[] + []**[])
)
```

## Zed the speed editor
The problem with ZED is how reformat the Tailwind class in HTML on every save.
Even if turn off the
The positive feedback is the consistent syntax highlight even in HTML embeded javascript code

_hapy ending_
