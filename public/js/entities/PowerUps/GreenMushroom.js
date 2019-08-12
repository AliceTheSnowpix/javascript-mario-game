import Entity from '../../Entity.js';
import LeftRightWalk from '../../traits/LeftRightWalk.js'
import {loadSpriteSheet} from '../../loaders.js';

export function loadGreenMushroom() {
    return loadSpriteSheet('powerups').then(createGreenMushroomFactory);
}

function createGreenMushroomFactory(sprite) {
    function drawGreenMushroom(ctx) {
        sprite.draw('green-mushroom', ctx, 0, 0);
    }

    return function createGreenMushroom() {
        const greenmushroom = new Entity();
        greenmushroom.size.set(16, 16);
        greenmushroom.addTrait(new LeftRightWalk());
        greenmushroom.draw = drawGreenMushroom;
        return greenmushroom;
    }
}