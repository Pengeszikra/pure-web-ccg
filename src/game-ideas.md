# Prepare for Hackhathon

[redit :: deadline :: dec 18!](https://redditgamesandpuzzles.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio)

## `<\>` Board Editor 
Let's moving forward to `board editor` which is a online 3D tabletop game editor, capable to handle a different `spritesheets` setup the whole environmet, handle cards, syntax highlight the generated code. Store asset valuse in JS object.

## `+` inline coding to `marker`
```
// After triple ` insert a "..." to make 
// render a whole stuff as a function.
// Which is strange but maybe working.
return "Hello World !"
```...

```
--return 42
```...

roll the dice 
```
Math.random() * 6 | 0 + 1
```...

## Midjourney first impression
It is very exciting the ability way of combining pictures wit `--cref` and `--sref`, this way I can create a consistent `asset` style, so just a bit of time to wait a `structural reference`. The `relax` mode is give a power to make any amount assets, just need a bit patente, but that is oke 

![](https://cdn.midjourney.com/da3ac216-33e3-4f5a-9775-3ecf6c1051e9/0_0.png)

```js
// deck rotate left
alien.deck.map((id, idx) => render[id.split('|')[2]].card.style.transform = `
  translateZ(${(alien.deck.length - idx) / 5 }rem)
  translateX(${(alien.deck.length - idx) / 2 }rem)
  rotateY(${(alien.deck.length - idx) * 2}deg)
  
  `);1
```

![](https://cdn.midjourney.com/de64befd-f71a-45f4-bcac-064da827875a/0_1.png)

## Game Engine :: `Marker`
The best way, when I create a minimal game engine, where I can setup a tabletop game in 3D with a sprite sheets. Let's do that way. May this marker have a game builder plugin. Why not?

```html
    main#desk {
        transform-style: preserve-3d;
        transform:
          perspective(70vh)
          rotateX(30deg)
          rotateY(-360deg)
          rotateZ(-360deg)
          scale(.64)
          translateZ(75px);
        pointer-events: none;
    }
```

![](https://cdn.midjourney.com/b8516cb2-7f04-42f3-8ce4-d14f52ea2778/0_1.png)

![](https://cdn.midjourney.com/8eb8d805-7ab6-4209-9121-f064d8b776b7/0_2.png)

## Galactic Reality Show
Your deck contains `intergalactic celebrities` and their `challanges` to survive the most epic reality show ever. Meanwhile a lot of good, bad or funy `moments` also stand your ( and enemi players ) way. That teams facing exotic `adventures` and `quest`, can youse a most luxory or even out dated spaceship, robots or other `gadget`, your goal to earn so many `fame score` as can do and survive every `vote out` ceremony.

## Login System With Markdown Editor

How much fun if the login system is a markdown editor,
until you fulfill the right code block, you can't login
to the game.

You can use `Marker` on minimal functionality or even worst.

> Wors idea is the `B A D - M A R K E R` which is editor, but turn to something else. Maybe insert a sarcastic or enigmatic remark to your code.

If try to change the skin to ligth then it is change a darker skin and everything will be much more scary. Even sometimes you can play minigame inside in some block.

The possibilities near endless.

> Maybe it is a evil paralell editor ( scary thing is open AI answer )

## 3D animations of cards

```js
document.querySelector('.card-front').style.transform=`
  translateX(13rem)
  translateZ(15rem)
  translateY(37rem)
  rotateY(45deg)
`;
```

## Game Ideas
- 3rd person tabletop game
- rotation puzzle, with functions
- card based tabletops:
  - star trader
  - fantasy explorer
  - emoji deep state
  - archeologist adventure
  - exotic animal photographer
  -math function card party
  - score gladiator
  - card controlled raid run
- elevator game
- idle game
- hero wars: puzzle movement
- dungeon crawler: lands of lore, with secret pass
- CCG Board: pirates sea trader, puzzle shape table elements
- item evolving game
- merge game
- story board game
- pet manager
- roll caster tycoon
- builder game
- dark space scientic evolution, black business, duty manager
- minecraft mixed jenga
- crime game
- post apocaliptic survivor game
- pub manager
- spaceship survive on lost spaceship
- cookie merger

{% 3match.html %}


## Live preview is awesome

After added two line of code to my app, it is immediatley transform to something else. A greatest portal stuff which is ever created:

```
// move to outside of and you have a mindblow draw program
{% https://excalidraw.com %}

// Jupiter notebook online
{% https://ipywidgets.readthedocs.io/en/latest/_static/lab/index.html %}
```

## Notebook
Maybe I can create a `jupiter notebook` like solution example,
but for this need to be make a server solution.
Plus do not forget to make section to avoiding rerender
output code plus iframe every typing.

> maybe JS code can I run with simple `Function`

```
''''test.html <-- indicate editor block with file name
<script src="old-bird-soft.js" type="module"></script>
<main class="min-h-screen bg-zinc-950 text-zinc-400">
  <section class="max-w-screen-2xl m-auto grid grid-cols-1 gap-2 lg:grid-cols-2">
    <textarea
    class="bg-zinc-800 text-zinc-400 focus:outline-none p-8 placeholder-zinc-600"
    placeholder=" - - - markdown editor - - - "
    spellcheck="false"
    ></textarea>
    <article class="bg-zinc-900 whitespace-pre-wrap px-8
      min-w-full min-h-screen relative
    ">
      <span id="debug-ms" class="absolute top-4 left-4 p-2 rounded-lg bg-neutral-950"></span>
      <markdown-view source="textarea" />
    </article>
  </section>
</main>
''''

// here is the running example

    /-----------------------\
    |                       |
    |                       |
    |                       |
    |                       |
    \-----------------------/
```

## Gallery

```sh
// make
lll > gallery.md
// rework to ![ ]( ) format with proper relative path
```

![ui-spritesheet-01.png](../sprites/ui-spritesheet-01.png)
![cat-cardset.jpg](../sprites/cat-cardset.jpg)
![card-al-bg.png](../sprites/card-al-bg.png)

{% https://alien-solitare.vercel.app/ %}

## Star Tabletop Game
One image can be describe somethin better, than 1000 word.

![](../sprites/duck-girl.png)
![](../sprites/floor-galaxy.png)
![](../sprites/floor-g2.png)

{% .. %}

```
// my gallery
{% https://dream.ai/profile/pvivo %}

// flux
{% https://cgdream.ai/my-images %}

// character animatior
{% https://viggle.ai/create %}

// remove background
{% https://clipdrop.co/remove-background %}

// maybe we can saw what we can arn this stuff? ( 10$/month ) also have a slow mode.
// just when the reddit game at least earn some state
//   example:
{% https://viggle.ai/share/e0807b30-9eaa-4547-a5f9-ceb39af9e84b %}
```







