import {Howl} from 'howler';

export class ServiceMusique {
    private musiqueThemePrincipal: Howl;

    constructor() {
        this.musiqueThemePrincipal = new Howl({
            src: ['assets/sound/boogaloopersMainTrack.wav'],
            loop: true
        });    
    }

    lancerMusique() {        
        this.musiqueThemePrincipal.play();
    }

    stoperMusique() {
        this.musiqueThemePrincipal.stop();
    }
}