import SpriteSheet from "./spritesheet.js";
import {loadImage, loadLevel} from "./loaders.js";
import {drawBackground} from "./functions.js";

const canvas =  document.getElementById('screen')
const context = canvas.getContext('2d')

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    loadLevel('1-1').then(level => {
        level.backgrounds.forEach(background => {
            drawBackground(background, context, sprites)
        });
    });
});