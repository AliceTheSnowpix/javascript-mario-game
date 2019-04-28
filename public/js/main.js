import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard} from './input.js';
import Camera from './Camera.js';
import {setupMouseControl} from './debug.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

let debug = true;
let debugBoxes = true;

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;
    mario.pos.set(64, 64);

    createCollisionLayer(level);

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);
    
    if(debug == false){
        
    } else {
        setupMouseControl(canvas, mario, camera);
    }
    if(debugBoxes == false) {

    } else {
        level.comp.layers.push(
            createCollisionLayer(level),
            createCameraLayer(camera));
    }

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(ctx, camera);
    }

    timer.start();
});
