import { Line } from "../class/Line";
import { Point } from "../class/Point";

export class ServiceFormes {
    p5: any;    

    constructor(p5: any) {
        this.p5 = p5;
    }

    verifierCroisementLigneAvecListeLignes(ligne: Line, lignes: Line[]) {
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

    verifierCroisementEntreDeuxLignes(ligne_a: Line, ligne_b: Line) {
        const Collides = require("p5collide");
        const croisement = Collides.collideLineLine(
          ligne_a.getPointA().getPosX(),
          ligne_a.getPointA().getPosY(),
          ligne_a.getPointB().getPosX(),
          ligne_a.getPointB().getPosY(),
          ligne_b.getPointA().getPosX(),
          ligne_b.getPointA().getPosY(),
          ligne_b.getPointB().getPosX(),
          ligne_b.getPointB().getPosY(),
        );
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
    
    verifierBoucleContientPoint(lignesDeLaBoucle: Line[], point: Point) {
        const Collides = require("p5collide");
        const polygone: [] = this.formePolygonaleFromLines(lignesDeLaBoucle);
        const capture: boolean = Collides.collidePointPoly(point.getPosX(), point.getPosY(), polygone); 
        if (capture) {      
          console.log('Capture');
        }
        return polygone;
    }

    formePolygonaleFromLines(lignesDeLaBoucle: Line[]) {
        let polygone: any = [];
        lignesDeLaBoucle.forEach((ligne: Line) => {
            polygone.push(this.p5.createVector(ligne.getPointA().getPosX(), ligne.getPointA().getPosY()));
            polygone.push(this.p5.createVector(ligne.getPointB().getPosX(), ligne.getPointB().getPosY()));
        });

        return polygone;
    }
}