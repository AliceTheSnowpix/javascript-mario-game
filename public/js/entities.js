import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadGreenKoopa} from './entities/GreenKoopa.js';
import {loadMushroom} from './entities/PowerUps/Mushroom.js';
import {loadGreenMushroom} from './entities/PowerUps/GreenMushroom.js';
import {loadFireFlower} from './entities/PowerUps/FireFlower.js';

export function loadEntities() {
    const entityFactories = {};
    function addAs(name) {
        return factory => entityFactories[name] = factory
    }
    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadGreenKoopa().then(addAs('greenkoopa')),
        loadMushroom().then(addAs('mushroom')),
        loadGreenMushroom().then(addAs('greenmushroom')),
        loadFireFlower().then(addAs('fireflower')),
    ]).then(() => entityFactories);
}