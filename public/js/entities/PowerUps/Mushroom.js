import Entity from '../../Entity.js';
import LeftRightWalk from '../../traits/LeftRightWalk.js'
import {loadSpriteSheet} from '../../loaders.js';

export function loadMushroom() {
    return loadSpriteSheet('powerups').then(createMushroomFactory);
}

function createMushroomFactory(sprite) {
    function drawMushroom(ctx) {
        sprite.draw('mushroom', ctx, 0, 0);
    }

    return function createMushroom() {
        const mushroom = new Entity();
        mushroom.size.set(16, 16);
        mushroom.addTrait(new LeftRightWalk());
        mushroom.draw = drawMushroom;
        return mushroom;
    }
}