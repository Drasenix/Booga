import { Ennemi } from "../class/Ennemi";
import { Point } from "../class/Point";

export class ServiceEnnemis {
    private p5: any;    

    private listeEnnemis: Ennemi[] = [];    

    constructor(p5: any) {
        this.p5 = p5;
    }

    instancierEnnemis(nbEnnemis: number) {

        let point_ennemi_actuel: Point;
        const hauteur_fenetre = window.innerHeight;
        const largeur_fenetre = window.innerWidth;

        for (let i = 0; i < nbEnnemis;  i++) {
            point_ennemi_actuel = new Point(Math.random() * largeur_fenetre, Math.random() * hauteur_fenetre);            
            this.listeEnnemis.push(new Ennemi(point_ennemi_actuel));
        }
    }

    updatePositionEnnemis() {
        this.listeEnnemis = this.listeEnnemis.map( (ennemi: Ennemi) => {
            ennemi.updatePosition();
            
            const collisionVaisseau = this.p5.serviceControleurPartie.getServiceVaisseau().verifierCollisionAvecEnnemi(ennemi);
            this.p5.serviceControleurPartie.getServiceVaisseau().verifierCollisionEnnemiAvecLigneVaisseau(ennemi);

            if (collisionVaisseau) {
                this.appliquerEffetsCollision(ennemi);       
            }
                        
            return ennemi;
        });
    }

    appliquerEffetsCollision(ennemi: Ennemi) {
        ennemi.inverserVelocite();
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

    validerCaptureEnnemi(ennemi: Ennemi) {
        this.supprimerEnnemi(ennemi);       
        
        if (this.listeEnnemis.length === 0) {
            this.p5.serviceControleurPartie.gagnerPartie();
        }
    }

    supprimerEnnemi(ennemi: Ennemi) {
        this.listeEnnemis = this.listeEnnemis.filter( (ennemiActuel: Ennemi) => {
            const ennemiDifferent = ennemi !== ennemiActuel;
            if (!ennemiDifferent && ennemiActuel.getContientBonus()) {
                const point: Point = new Point(ennemiActuel.getEnnemiCercle().getPosX(), ennemiActuel.getEnnemiCercle().getPosY());
                this.p5.serviceControleurPartie.getServiceBonus().faireApparaitreItemBouclier(point);
            }
            return ennemiDifferent;
        })
    }

    public getListeEnnemis(): Ennemi[] {
        return this.listeEnnemis;
    }

    public setListeEnnemis(value: Ennemi[]) {
        this.listeEnnemis = value;
    }
}