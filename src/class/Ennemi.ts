import { Point } from "./Point";

export class Ennemi {

    private point: Point;
    private velocite_x: number;
    private velocite_y: number;
    
    constructor(point: Point) {
        this.point = point;        
        this.velocite_x = Math.random() * Math.round(Math.random()) ? 1 : -1;
        this.velocite_y = Math.random() * Math.round(Math.random()) ? 1 : -1;
    }

    updatePosition() {
        if (
            this.point.getPosX() + this.velocite_x > window.innerWidth ||
            this.point.getPosX() + this.velocite_x< 0
        ) {
            this.velocite_x = this.velocite_x * -1;
        }

        if (
            this.point.getPosY() + this.velocite_y > window.innerHeight ||
            this.point.getPosY() + this.velocite_y < 0
        ) {
            this.velocite_y = this.velocite_y * -1;
        }

        this.point.setPosX(this.point.getPosX() + this.velocite_x);
        this.point.setPosY(this.point.getPosY() + this.velocite_y);
    }

    public getPoint(): Point {
        return this.point;
    }
    public setPoint(value: Point) {
        this.point = value;
    }
}