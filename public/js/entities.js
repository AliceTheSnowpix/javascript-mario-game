import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';
//! import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(16, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        //! mario.addTrait(new Velocity());

        mario.draw = function drawMario(ctx) {
            sprite.draw('idle', ctx, 0, 0);
        }
        return mario;
    });
}