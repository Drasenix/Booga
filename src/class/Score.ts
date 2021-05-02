import { Point } from "./Point";

export class Score {

    private valeur: number;    
    private point: Point;    
    private size: number;    
    private nbFramesAnimation: number;
    

    constructor(
        valeur: number,
        pos_x: number,
        pos_y: number,
        size: number
    ) {
        this.valeur = valeur;
        this.point = new Point(pos_x, pos_y);
        this.size = size;
        this.nbFramesAnimation = 50;
    }

    public ajouterScore(score: number) {
        this.valeur += score;
    }

    public validerFrameAnimation() {
        this.nbFramesAnimation = this.nbFramesAnimation - 1;
    }

    public getValeur(): number {
        return this.valeur;
    }
    public setValeur(value: number) {
        this.valeur = value;
    }
  
    public getSize(): number {
        return this.size;
    }
    public setSize(value: number) {
        this.size = value;
    }

    public getPoint(): Point {
        return this.point;
    }
    public setPoint(value: Point) {
        this.point = value;
    }

    public getNbFramesAnimation(): number {
        return this.nbFramesAnimation;
    }
    public setNbFramesAnimation(value: number) {
        this.nbFramesAnimation = value;
    }
    
    

}