import { Circle } from "./Circle";
import { Point } from "./Point";

export class Ennemi {

    private ennemi_cercle: Circle;
    
    private rayonCercle = Math.random() * 30 + 10;
    
    private velocite_x: number;
    private velocite_y: number;
    
    constructor(point: Point) {
        this.ennemi_cercle = new Circle(point.getPosX(), point.getPosY(), this.rayonCercle);
        this.velocite_x = Math.random() * Math.round(Math.random()) ? 1 : -1;
        this.velocite_y = Math.random() * Math.round(Math.random()) ? 1 : -1;
    }

    updatePosition() {
        if (
            this.ennemi_cercle.getPosX() + this.velocite_x > window.innerWidth ||
            this.ennemi_cercle.getPosX() + this.velocite_x< 0
        ) {
            this.velocite_x = this.velocite_x * -1;
        }

        if (
            this.ennemi_cercle.getPosY() + this.velocite_y > window.innerHeight ||
            this.ennemi_cercle.getPosY() + this.velocite_y < 0
        ) {
            this.velocite_y = this.velocite_y * -1;
        }

        this.ennemi_cercle.setPosX(this.ennemi_cercle.getPosX() + this.velocite_x);
        this.ennemi_cercle.setPosY(this.ennemi_cercle.getPosY() + this.velocite_y);
    }

    public getRayonCercle() {
        return this.rayonCercle;
    }
    public setRayonCercle(value: number) {
        this.rayonCercle = value;
    }

    public getEnnemiCercle(): Circle {
        return this.ennemi_cercle;
    }
    public setEnnemiCercle(value: Circle) {
        this.ennemi_cercle = value;
    }
}