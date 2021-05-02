import { Ennemi } from "../class/Ennemi";
import { Circle } from "../class/Circle";
import { Point } from "../class/Point";

export class ServiceEnnemis {
    private p5: any;    

    private listeEnnemis: Ennemi[] = [];
    

    private nbEnnemis: number = 10;

    constructor(p5: any) {
        this.p5 = p5;
    }

    instancierEnnemis() {

        let point_ennemi_actuel: Point;
        const hauteur_fenetre = window.innerHeight;
        const largeur_fenetre = window.innerWidth;

        for (let i = 0; i < this.nbEnnemis;  i++) {
            point_ennemi_actuel = new Point(Math.random() * largeur_fenetre, Math.random() * hauteur_fenetre);            
            this.listeEnnemis.push(new Ennemi(point_ennemi_actuel));
        }
    }

    updatePositionEnnemis() {
        this.listeEnnemis = this.listeEnnemis.map( (ennemi: Ennemi) => {
            ennemi.updatePosition();            
            return ennemi;
        });
    }

    drawEnnemis() {
        this.updatePositionEnnemis();

        this.p5.fill(255, 255, 255);
        this.listeEnnemis.forEach((ennemi: Ennemi) => {        
            this.p5.circle(ennemi.getEnnemiCercle().getPosX(), ennemi.getEnnemiCercle().getPosY(), ennemi.getRayonCercle());
        });
    }

    getListeCerclesEnnemis() {
        return this.listeEnnemis.map((ennemi: Ennemi) => {
            return ennemi.getEnnemiCercle();
        });
    }

    supprimerEnnemiDepuisCercle(cercle: Circle) {
        this.listeEnnemis = this.listeEnnemis.filter( (ennemi: Ennemi) => {
            return ennemi.getEnnemiCercle().getPosX() !== cercle.getPosX() && ennemi.getEnnemiCercle().getPosY() !== cercle.getPosY();
        })
    }

    public getListeEnnemis(): Ennemi[] {
        return this.listeEnnemis;
    }

    public setListeEnnemis(value: Ennemi[]) {
        this.listeEnnemis = value;
    }
}