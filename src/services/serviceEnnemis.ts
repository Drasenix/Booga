import { Point } from "../class/Point";

export class ServiceEnnemis {
    p5: any;    

    listePointsEnnemis: Point[] = [];
    nbEnnemis: number = 10;

    constructor(p5: any) {
        this.p5 = p5;
    }

    instancierEnnemis() {

        let point_ennemi_actuel: Point;
        const hauteur_fenetre = window.innerHeight;
        const largeur_fenetre = window.innerWidth;

        for (let i = 0; i < this.nbEnnemis;  i++) {
            point_ennemi_actuel = new Point(Math.random() * largeur_fenetre, Math.random() * hauteur_fenetre);
            this.listePointsEnnemis.push(point_ennemi_actuel);
        }
    }

    updatePositionEnnemis() {
        this.listePointsEnnemis = this.listePointsEnnemis.map( (pointEnnemi: Point) => {
            pointEnnemi.setPosX(pointEnnemi.getPosX() * 0.99);
            pointEnnemi.setPosY(pointEnnemi.getPosY() * 0.99);
            return pointEnnemi;

        });
    }

    drawEnnemis() {
        this.updatePositionEnnemis();

        this.p5.fill(0, 0, 0);
        this.listePointsEnnemis.forEach((point_ennemis: Point) => {        
            this.p5.circle(point_ennemis.getPosX(), point_ennemis.getPosY(), 20);
        });
    }

    supprimerPointEnnemis(point: Point) {
        this.listePointsEnnemis = this.listePointsEnnemis.filter( (pointEnnemi: Point) => {
            return pointEnnemi.getPosX() !== point.getPosX() && pointEnnemi.getPosY() !== point.getPosY();
        })
    }
}