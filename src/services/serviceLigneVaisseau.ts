import { Circle } from "../class/Circle";
import { Line } from "../class/Line";
import { Point } from "../class/Point";
import { ServiceFormes } from "./serviceFormes";

export class ServiceVaisseau {
    p5: any;    
    serviceForme: ServiceFormes;
    Collides: any = require("p5collide");;

    indexPhaseAnimation: number = 0;
    nbFrameAnimation: number = 10;
    formeBoucle: any[] = [];
    nbMaxLignes = 100;
    pointTestCollision: Point;
    historiquesCoordonneesCurseur: Point[] = [];
    pointeur_cercle: Circle | undefined;

    constructor(p5: any, pointTestCollision: Point) {
        this.p5 = p5;
        this.serviceForme = new ServiceFormes(p5);
        this.pointTestCollision = pointTestCollision;
    }

    drawFormeBoucle() {    
        if (this.formeBoucle.length > 0 && this.indexPhaseAnimation > 0) {
            this.p5.beginShape();
            for (const { x, y } of this.formeBoucle)  this.p5.vertex(x, y);
            this.p5.endShape(this.Collides.CLOSE);

            this.formeBoucle = this.serviceForme.diminuerFormeDeMoitieVersLeCentre(this.formeBoucle);
            this.indexPhaseAnimation--;
        }
    }

    drawLines() {
        if (this.historiquesCoordonneesCurseur.length >= 2) {
          const listeLignesParcourues = this.calculerLignesParcourues(this.historiquesCoordonneesCurseur);
          
          (listeLignesParcourues).forEach((ligne: Line) => {
            this.p5.strokeWeight(5);
            this.p5.stroke(0,0,0);        
            this.p5.line(ligne.getPointA().getPosX(), ligne.getPointA().getPosY(), ligne.getPointB().getPosX(), ligne.getPointB().getPosY());
          });
        }
    }    

    instancierCurseur(pos_x: number, pos_y: number) {
        this.pointeur_cercle = new Circle(pos_x, pos_y, 50);
    }

    gererHistoriqueCoordonnes(point: Point) {
        if (this.historiquesCoordonneesCurseur.length === this.nbMaxLignes) {
          this.historiquesCoordonneesCurseur.shift();
        }
        this.historiquesCoordonneesCurseur.push(point);
      }
    
    calculerLignesParcourues(listePoints: Point[]) {
        const longueurTab = listePoints.length;
        let coupleEnCours: Point[] = [];
        let resultat: Line[] = [];
    
        for (let i = 0; i < longueurTab; i++) {            
                        
            if (coupleEnCours.length === 2 ) {
                coupleEnCours.shift();
            }
            
            coupleEnCours.push(listePoints[i]);
            
            if (coupleEnCours.length === 2 ) {
                resultat.push(new Line(coupleEnCours[0], coupleEnCours[1]));
            }         
        }
        return resultat;
    }
    
    verifierSiBoucleComplete() {
        if (this.historiquesCoordonneesCurseur.length >= 2) {
          let listeLignesParcourues: Line[] = this.calculerLignesParcourues(this.historiquesCoordonneesCurseur);
          const derniereLigne: Line | undefined = listeLignesParcourues.pop();
          const ligneEnTrop: Line | undefined = listeLignesParcourues.pop();
    
          const ligneDeCroisement = this.serviceForme.verifierCroisementLigneAvecListeLignes(derniereLigne, listeLignesParcourues);
          
          if (ligneDeCroisement && derniereLigne && ligneEnTrop) {
              listeLignesParcourues.push(ligneEnTrop);
              listeLignesParcourues.push(derniereLigne);
              const lignesDeLaBoucle: Line[] = this.conserverLignesBoucle(ligneDeCroisement, listeLignesParcourues);
              
              const formeCreee: [] = this.serviceForme.verifierBoucleContientPoint(lignesDeLaBoucle, this.pointTestCollision);
              this.validerBoucle(formeCreee);
          }
        }
      }
    
    conserverLignesBoucle(ligneDeCroisement: Line, listeLignesParcourues: Line[]) {
        const indexLigneCroisement = listeLignesParcourues.indexOf(ligneDeCroisement);    
        let resultat = listeLignesParcourues.slice(indexLigneCroisement+1);
        resultat.pop();
        return resultat;
    }
      
    validerBoucle = (forme: []) => {
        this.historiquesCoordonneesCurseur = [];
        this.formeBoucle = forme;
        this.indexPhaseAnimation = this.nbFrameAnimation;    
    }   
    
    async effacerHistoriqueAvecLatence(ms: number) {
        if (ms > 0 ) {
          while (this.historiquesCoordonneesCurseur.length > 0) {
            this.historiquesCoordonneesCurseur.shift();
            await this.p5.sleep(ms);
          }
        } else {
          this.historiquesCoordonneesCurseur = [];
        }
    }
}