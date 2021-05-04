import { Circle } from "./Circle";
import { Point } from "./Point";
import { Score } from "./Score";

export class Ennemi {

    private ennemi_cercle: Circle;
    
    private rayonCercle = Math.random() * 30 + 10;
    
    private velocite_x: number;
    private velocite_y: number;
    
    private score: Score;
    
    private contientBonus: boolean;
    
    
    constructor(point: Point) {
        this.ennemi_cercle = new Circle(point.getPosX(), point.getPosY(), this.rayonCercle);
        this.velocite_x = Math.random() * 5 * (Math.round(Math.random()) ? 1 : -1);
        this.velocite_y = Math.random() * 5 * (Math.round(Math.random()) ? 1 : -1);
    
        const valueScore = 50;
        const tailleScore = 32;
        this.score = new Score(valueScore, point.getPosX(), point.getPosY(), tailleScore);

        const random = Math.random() * 10;
        this.contientBonus = random < 0.5 ? true : false; 
    }

    updatePosition() {
        const nouveauPointScore = new Point(this.ennemi_cercle.getPosX(), this.ennemi_cercle.getPosY());
        this.score.setPoint(nouveauPointScore);
        if (
            this.ennemi_cercle.getPosX() + this.velocite_x > window.innerWidth ||
            this.ennemi_cercle.getPosX() + this.velocite_x < 0
        ) {
            this.inverserVelociteX();
        }

        if (
            this.ennemi_cercle.getPosY() + this.velocite_y > window.innerHeight ||
            this.ennemi_cercle.getPosY() + this.velocite_y < 0
        ) {
            this.inverserVelociteY();
        }

        this.ennemi_cercle.setPosX(this.ennemi_cercle.getPosX() + this.velocite_x);
        this.ennemi_cercle.setPosY(this.ennemi_cercle.getPosY() + this.velocite_y);
    }

    public inverserVelocite() {
        this.inverserVelociteX();
        this.inverserVelociteY();
    }

    public inverserVelociteX() {
        this.velocite_x = this.velocite_x * -1;
    }

    public inverserVelociteY() {
        this.velocite_y = this.velocite_y * -1;
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

    public getScore(): Score {
        return this.score;
    }
    public setScore(value: Score) {
        this.score = value;
    }

    public getContientBonus(): boolean {
        return this.contientBonus;
    }
    public setContientBonus(value: boolean) {
        this.contientBonus = value;
    }
}