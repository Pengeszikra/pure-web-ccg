# React to Pure Web

Own fail is the greates motivator to step forward. I was failed to win a small game competition with my alien-solitare game. 

I realised even I was work as React developers 7+ years, plus I was written a small ( really small 70LOC ) jsDoc based React State system npm module: jsduc-dock  this works give me a challenging point because I am fare away of pure web. React is great framework/library for using a daily based work. But give too many dependency and abstraction to your code base. In my real work I was keep to use React for my job, because this is the standard. But this example game development was light me up. I was fight for a different reason of 

jsDoc the nobuild type system for javascript.
Work with a legacy code base - many of us don't able to dodge time by time - lead me to try the jsDoc instead of Typescript. I have to reveal the surprising truth!

First off all let's clean: jsDoc or TS just means under developer time ( included later review, reusing, look at that code in any environment: git web page, random editor, chrome, firefox, ...:devtool, vim, cat ... );

jsDoc vs. Typescript
In my experience the jsDoc able to replace the TS code, bonus the wormhole between these two exists.

The biggest jsDoc feature imho: this is using a standard JS comment system, so don't break any JS code, this code will rune everywhere where JS capable to run.

- Compiling freedom :: Do not need compiling the code.

- Dependency freedom :: Can working without any dependency

- Namespace freedom :: Don't interfere Types and other imports names. You can use same name of component and component Type in React for example.

- Rework freedom :: Don't need to change existing code, just insert a comment.

- Legacy freedom :: Can be use even transform to Typescript the project is not option. Many legacy projects affected this situation.

- Maximalism freedom :: Don't need to use every where. Even you can use on a new commits, and after easy to search which is the new or reworked parts.

- Future freedom :: Later can easy trasnlate to TS. Under the hood this is use same technic, just different way.

- Mindset freedom :: Because this is a comment your know well this is don't made any type check at runtime for you as TS also.