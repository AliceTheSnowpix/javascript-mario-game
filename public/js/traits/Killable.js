import {Trait} from "../Entity.js";

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTIme = 0;
        this.removeAfter = 2;
    }

    kill() {
        this.dead = true;
    }

    revive() {
        this.dead = false;
        this.deadTIme = 0;
    }

    update(entity, deltaTime, level) {
        if (this.dead) {
            this.deadTIme += deltaTime;
            if (this.deadTIme > this.removeAfter) {
                level.entities.delete(entity);
            }
        }
    } 
}