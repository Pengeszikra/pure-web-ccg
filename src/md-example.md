# Markdown Test
## Some nice markdown editor is `there`
At this current state this markdown post to be looks likes as I expected.

```html
<header></header>
<main>
</main>
<script>
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


_hapy ending_

