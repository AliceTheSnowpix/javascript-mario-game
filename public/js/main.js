import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard} from './input.js';
import Camera from './Camera.js';
import {setupMouseControl} from './debug.js';
import {loadEntities} from './entities.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';

let debug = false;
let debugBoxes = false;
if (screen.width <= 420) location.href = './mobile.html';

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.setPlayer(playerEntity);
    playerControl.checkpoint.set(64, 208);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas) {
    const ctx = canvas.getContext('2d');
    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);
    const level = await loadLevel('1-1');

    const camera = new Camera();
    window.camera = camera;
    
    const mario = entityFactory.mario();
    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);
    
    const input = setupKeyboard(mario);
    input.listenTo(window);
    
    if (!debug);
    else setupMouseControl(canvas, mario, camera);
    if (!debugBoxes);
    else level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        // console.log(mario.pos.y, mario.pos.x)
        level.update(deltaTime, level);
        level.comp.draw(ctx, camera);
        camera.pos.x = Math.max(0, mario.pos.x - 100);
        // if (mario.pos.y === 160 && mario.pos.x > 365 && mario.pos.x < 375) {
        //     const mushroom = entityFactory.mushroom();
        //     mushroom.pos.set(365, 128);
        //     level.entities.add(mushroom);
        // }
        if (mario.pos.x < 1) mario.pos.x = 1
        else if (mario.pos.x > 1101 && mario.pos.y > 220) {
            mario.killable.kill()
            //camera.pos.x = 0;
        }
    }  
    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas)