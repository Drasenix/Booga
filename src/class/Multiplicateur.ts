import { Point } from "./Point";
import { Score } from "./Score";


export class Multiplicateur {

    private valeur: number;    
    private taille;    
    private point: Point;
    private nbFramesAnimation: number;    

    constructor(
        valeur: number,
        pos_x: number,
        pos_y: number
    ) {
        this.valeur = valeur;
        this.taille = 32 + (valeur * 2);
        this.point = new Point(pos_x, pos_y);
        this.nbFramesAnimation = 50;
    }

    appliquerMultiplicateurSurScore(score: Score) {
        return new Score(
            score.getValeur() * this.valeur,
            score.getPoint().getPosX(),
            score.getPoint().getPosY(),
            this.taille
        );
    }

    getText() {
        return 'X'+this.valeur+' !';
    }

    public validerFrameAnimation() {
        this.nbFramesAnimation = this.nbFramesAnimation - 1;
    }

    public getPoint(): Point {
        return this.point;
    }
    public setPoint(value: Point) {
        this.point = value;
    }
    public getTaille() {
        return this.taille;
    }
    public setTaille(value: number) {
        this.taille = value;
    }
    public getValeur(): number {
        return this.valeur;
    }
    public setValeur(value: number) {
        this.valeur = value;
    }

    public getNbFramesAnimation(): number {
        return this.nbFramesAnimation;
    }
    public setNbFramesAnimation(value: number) {
        this.nbFramesAnimation = value;
    }
}