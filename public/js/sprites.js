import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadMarioSprite() {
<<<<<<< HEAD
    return loadImage('./img/characters.gif')
=======
<<<<<<< HEAD
    return loadImage('/img/characters.gif')
=======
    return loadImage('./img/characters.gif')
>>>>>>> b41fbc12b4e05fe7877989389a0908f6e867d99a
>>>>>>> added timer
    .then(image => {
        const mario = new SpriteSheet(image, 16, 16);
        mario.define('idle', 276, 44, 16, 16);
        return mario;
    });
}

export function loadBackgroundSprites() {
<<<<<<< HEAD
    return loadImage('./img/tiles.png')
=======
<<<<<<< HEAD
    return loadImage('/img/tiles.png')
=======
    return loadImage('./img/tiles.png')
>>>>>>> b41fbc12b4e05fe7877989389a0908f6e867d99a
>>>>>>> added timer
    .then(image => {
        console.log('Image loaded', image);
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}