import { Circle } from "./Circle";
import { Point } from "./Point";

export class Vaisseau {

    private historiquesCoordonneesCurseur: Point[] = [];
    private formeBoucle: any[] = [];
    
    private pointeurCercle: Circle;    
    private rayonCercle = 50;
    private invincible: boolean = false;
    

    constructor(pos_x: number, pos_y: number) {
        this.pointeurCercle = new Circle(pos_x, pos_y, this.rayonCercle);        
    }

    updatePosition(point: Point) {
        this.pointeurCercle.setPosX(point.getPosX());
        this.pointeurCercle.setPosY(point.getPosY());
    }
    public getHistoriquesCoordonneesCurseur(): Point[] {
        return this.historiquesCoordonneesCurseur;
    }
    public setHistoriquesCoordonneesCurseur(value: Point[]) {
        this.historiquesCoordonneesCurseur = value;
    }

    public getFormeBoucle(): any[] {
        return this.formeBoucle;
    }
    public setFormeBoucle(value: any[]) {
        this.formeBoucle = value;
    }

    public getPointeurCercle(): Circle {
        return this.pointeurCercle;
    }
    public setPointeurCercle(value: Circle ) {
        this.pointeurCercle = value;
    }

    public getRayonCercle() {
        return this.rayonCercle;
    }
    public setRayonCercle(value: number) {
        this.rayonCercle = value;
    }

    public isInvincible(): boolean {
        return this.invincible;
    }

    public setInvincible(value: boolean) {
        this.invincible = value;
    }

}