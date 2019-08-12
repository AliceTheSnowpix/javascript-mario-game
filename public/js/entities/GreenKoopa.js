import Entity, {Trait} from '../Entity.js';
import LeftRightWalk from '../traits/LeftRightWalk.js'
import {loadSpriteSheet} from '../loaders.js';
import Killable from '../traits/Killable.js'

export function loadGreenKoopa() {
    return loadSpriteSheet('greenkoopa').then(createGreenKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');


class Behavior extends Trait {
    constructor() {
        super('behavior');
        this.state = STATE_WALKING;
        this.hideTime = 0;
        this.hideDuration = 5;
    }

    collides(us, them) {
        if (us.killable.dead) return;

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them);
            } else {
                them.killable.kill();
            }
        }
    }

    handleStomp(us, them) {
        if (this.state === STATE_WALKING) this.hide(us);
        else if (this.state === STATE_HIDING) {
            us.killable.kill();
            us.vel.set(100, -200);
        }
    } 

    hide(us) {
        us.vel.x = 0;
        us.leftrightwalk.enabled = false;
        this.hideTime = 0;
        this.state = STATE_HIDING;
    }

    unhide(us) {
        us.leftrightwalk.enabled = true;
        this.state = STATE_WALKING;
    }

    update(us, deltaTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration) this.unhide(us);
        }
    }
}

function createGreenKoopaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    function routeAnim(koopa) {
        if (koopa.behavior.state === STATE_HIDING) return 'hiding';
        return walkAnim(koopa.lifetime);
    }

    function drawGreenKoopa(ctx) {
        sprite.draw(routeAnim(this), ctx, 0, 0, this.vel.x < 0);
    }

    return function createGreenKoopa() {
        const greenkoopa = new Entity();
        greenkoopa.size.set(16, 16);
        greenkoopa.offset.y = 8
        greenkoopa.addTrait(new LeftRightWalk());
        greenkoopa.addTrait(new Behavior());
        greenkoopa.addTrait(new Killable());
        greenkoopa.draw = drawGreenKoopa;
        return greenkoopa;
    }
}