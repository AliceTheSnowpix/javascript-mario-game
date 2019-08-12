import Entity from '../../Entity.js';
import {loadSpriteSheet} from '../../loaders.js';

export function loadFireFlower() {
    return loadSpriteSheet('powerups').then(createFireFlowerFactory);
}

function createFireFlowerFactory(sprite) {
    function drawFireFlower(ctx) {
        sprite.draw('fire-flower', ctx, 0, 0);
    }

    return function createFireFlower() {
        const fireflower = new Entity();
        fireflower.size.set(16, 16);
        fireflower.draw = drawFireFlower;
        return fireflower;
    }
}