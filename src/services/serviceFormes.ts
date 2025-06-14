import { Circle } from "../class/Circle";
import { Line } from "../class/Line";
import { Point } from "../class/Point";

export class ServiceFormes {
    private p5: any;    
    
    private Collides: any = require("p5collide");

    constructor(p5: any) {
        this.p5 = p5;
    }

    verifierCroisementLigneAvecListeLignes(ligne: Line | undefined,  lignes: Line[]) {
        let ligneDeCroisement = null;
        lignes.forEach((l: Line) =>{
          const croisementExistant = this.verifierCroisementEntreDeuxLignes(ligne, l);
          if (croisementExistant) {
            ligneDeCroisement = l;        
          };
        });
        return ligneDeCroisement;
    }

    diminuerFormeDeMoitieVersLeCentre(forme: any[]) {  
        const pointCentral = this.trouverPointCentralFormeFermee(forme);
        let formeDiminuee: any[] = [];
        
        for (const { x, y } of forme) {
          const pointForme = new Point(x, y);
          const ligneAvecLeCentre = new Line(pointForme, pointCentral);
          const pointFormeDiminuee = this.trouverPointCentreLigne(ligneAvecLeCentre);
          formeDiminuee.push(this.p5.createVector(pointFormeDiminuee.getPosX(), pointFormeDiminuee.getPosY()));
        }
        return formeDiminuee;
    }

    verifierCroisementEntreDeuxLignes(ligne_a: Line | undefined, ligne_b: Line) {

        let croisement = undefined;
        
        if (ligne_a && ligne_b) {
            croisement = this.Collides.collideLineLine(
              ligne_a.getPointA().getPosX(),
              ligne_a.getPointA().getPosY(),
              ligne_a.getPointB().getPosX(),
              ligne_a.getPointB().getPosY(),
              ligne_b.getPointA().getPosX(),
              ligne_b.getPointA().getPosY(),
              ligne_b.getPointB().getPosX(),
              ligne_b.getPointB().getPosY(),
            );
        }
        return croisement;
    }

    trouverPointCentralFormeFermee = (forme: any[]) => {
        const point_depart = new Point(forme[0].x, forme[0].y);
        const index_milieu = forme.length / 2;
        const point_milieu = new Point(forme[index_milieu].x, forme[index_milieu].y);
        
        const ligneReference = new Line(point_depart, point_milieu);
        return this.trouverPointCentreLigne(ligneReference);
    }
    
    diminuerLigneDeMoitie = (ligne: Line) => {
    
        const point_a = ligne.getPointA();
        const point_b = ligne.getPointB();

        const pointCentre = this.trouverPointCentreLigne(ligne);

        const ligne_point_a_point_centre = new Line(point_a, pointCentre);
        const ligne_point_centre_point_b = new Line(pointCentre, point_b);

        const pointCentre_a = this.trouverPointCentreLigne(ligne_point_a_point_centre);
        const pointCentre_b = this.trouverPointCentreLigne(ligne_point_centre_point_b);

        return new Line(pointCentre_a, pointCentre_b);

    }

    trouverPointCentreLigne (ligne: Line) {
        const point_a = ligne.getPointA();
        const point_b = ligne.getPointB();
    
        const pointCentreLigne_x = (point_a.getPosX() + point_b.getPosX()) / 2;
        const pointCentreLigne_y = (point_a.getPosY() + point_b.getPosY()) / 2;
    
        return new Point(pointCentreLigne_x, pointCentreLigne_y);
    }    

    formePolygonaleFromLines(lignesDeLaBoucle: Line[]) {
        let polygone: any = [];
        lignesDeLaBoucle.forEach((ligne: Line) => {
            polygone.push(this.p5.createVector(ligne.getPointA().getPosX(), ligne.getPointA().getPosY()));
            polygone.push(this.p5.createVector(ligne.getPointB().getPosX(), ligne.getPointB().getPosY()));
        });

        return polygone;
    }

    verifierCercleVaisseauCollidesCercleEnnemi(vaisseauCercle: Circle, ennemiCercle: Circle) {
       return this.Collides.collideCircleCircle(
           vaisseauCercle.getPosX(),
           vaisseauCercle.getPosY(),
           vaisseauCercle.getRayon(),
           ennemiCercle.getPosX(),
           ennemiCercle.getPosY(),
           ennemiCercle.getRayon(),
        ) ;
    }

    verifierCercleEnnemiCollideLigne(ennemiCercle: Circle, ligneVaisseau: Line) {
        return this.Collides.collideLineCircle(
            ligneVaisseau.getPointA().getPosX(),            
            ligneVaisseau.getPointA().getPosY(),
            ligneVaisseau.getPointB().getPosX(),            
            ligneVaisseau.getPointB().getPosY(),
            ennemiCercle.getPosX(),
            ennemiCercle.getPosY(),
            ennemiCercle.getRayon()
        );
    }
}