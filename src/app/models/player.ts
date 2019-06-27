import { Piece } from './piece';

export class Player {

    ready: boolean;

    constructor(public name: string, public color: string){
        this.ready = false;
    }
}