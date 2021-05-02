import { Circle } from "../class/Circle";
import { Ennemi } from "../class/Ennemi";
import { Line } from "../class/Line";
import { Point } from "../class/Point";
import { Vaisseau } from "../class/Vaisseau";
import { ServiceEnnemis } from "./serviceEnnemis";
import { ServiceFormes } from "./serviceFormes";
import { ServicePVs } from "./servicePV";

export class ServiceVaisseau {
    private p5: any;    
    private Collides: any = require("p5collide");;
    private serviceForme: ServiceFormes;
    private serviceEnnemis: ServiceEnnemis;
    private servicePVs: ServicePVs;
    
    private indexPhaseAnimation: number = 0;
    private nbFrameAnimation: number = 10;    
    private nbMaxLignes = 100;    
    private timerInvincibilite: any;
    
    private couleurVaisseau;
    private couleurVaisseauInvincible;

    vaisseau: Vaisseau;    

    constructor(
      p5: any,
      serviceEnnemis: ServiceEnnemis,
      serviceForme: ServiceFormes,
      servicePVs: ServicePVs,
      pos_x: number,
      pos_y: number
    ) {
        this.p5 = p5;
        this.serviceForme = serviceForme;
        this.serviceEnnemis = serviceEnnemis;
        this.vaisseau = new Vaisseau(pos_x, pos_y);
        this.servicePVs = servicePVs;
        this.couleurVaisseau = this.p5.color(255, 255, 255);
        this.couleurVaisseauInvincible = this.p5.color(23,150,24);
    }

    drawFormeBoucle() {    
        if (this.vaisseau.getFormeBoucle().length > 0 && this.indexPhaseAnimation > 0) {
            this.p5.beginShape();
            for (const { x, y } of this.vaisseau.getFormeBoucle())  this.p5.vertex(x, y);
            this.p5.endShape(this.Collides.CLOSE);

            this.vaisseau.setFormeBoucle(
              this.serviceForme.diminuerFormeDeMoitieVersLeCentre(this.vaisseau.getFormeBoucle())
            );
            this.indexPhaseAnimation--;
        }
    }

    drawVaisseau() {
      this.drawFormeBoucle();    
      this.drawLines();
      
      this.p5.noStroke();

      const couleurVaisseauActuelle = this.vaisseau.isInvincible() ? this.couleurVaisseauInvincible : this.couleurVaisseau;
      
      this.p5.fill(couleurVaisseauActuelle);
      
      if (this.vaisseau.getPointeurCercle()) {
        this.p5.circle(this.vaisseau.getPointeurCercle().getPosX(), this.vaisseau.getPointeurCercle().getPosY(), this.vaisseau.getPointeurCercle().getRayon());
      }
    }

    drawLines() {
        if (this.vaisseau.getHistoriquesCoordonneesCurseur().length >= 2) {
          const listeLignesParcourues = this.calculerLignesParcourues(this.vaisseau.getHistoriquesCoordonneesCurseur());
          
          (listeLignesParcourues).forEach((ligne: Line) => {
            this.p5.strokeWeight(5);
            this.p5.stroke(255,255,255);        
            this.p5.line(ligne.getPointA().getPosX(), ligne.getPointA().getPosY(), ligne.getPointB().getPosX(), ligne.getPointB().getPosY());
          });
        }
    }    

    gererDeplacementVaisseau(point: Point) {
      this.vaisseau.updatePosition(point);
      this.gererHistoriqueCoordonnes(point);
      
      const collision = this.verifierCollisionAvecEnnemi();
      
      if (collision) {
        this.appliquerEffetsCollision();        
      }

      this.verifierSiBoucleComplete();
      clearTimeout(this.p5.timer);
      this.p5.timer=setTimeout(this.p5.mouseStopped,200);
    }
    
    appliquerEffetsCollision() {
      this.servicePVs.reduirePVs();
      this.effacerHistoriqueCoordonneesCurseur();
      this.rendreVaisseauInvincibleTemporairement(2000);
    }

    verifierCollisionAvecEnnemi() {
      let collision = false;
      const ennemis = this.serviceEnnemis.getListeEnnemis();
      
      if (!this.vaisseau.isInvincible()) {
        collision = ennemis.some((ennemi: Ennemi) => {
          return this.serviceForme.verifierCercleVaisseauCollidesCercleEnnemi(this.vaisseau.getPointeurCercle(), ennemi.getEnnemiCercle());
          
        });
      }

      return collision;
    }

    rendreVaisseauInvincibleTemporairement(ms: number) {
      this.vaisseau.setInvincible(true);
      clearTimeout(this.timerInvincibilite);
      this.timerInvincibilite=setTimeout(() => this.vaisseau.setInvincible(false), ms);
    }

    gererHistoriqueCoordonnes(point: Point) {
        if (this.vaisseau.getHistoriquesCoordonneesCurseur().length === this.nbMaxLignes) {
          this.vaisseau.getHistoriquesCoordonneesCurseur().shift();
        }
        this.vaisseau.getHistoriquesCoordonneesCurseur().push(point);
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
        if (this.vaisseau.getHistoriquesCoordonneesCurseur().length >= 2) {
          let listeLignesParcourues: Line[] = this.calculerLignesParcourues(this.vaisseau.getHistoriquesCoordonneesCurseur());
          const derniereLigne: Line | undefined = listeLignesParcourues.pop();
          const ligneEnTrop: Line | undefined = listeLignesParcourues.pop();
    
          const ligneDeCroisement = this.serviceForme.verifierCroisementLigneAvecListeLignes(derniereLigne, listeLignesParcourues);
          
          if (ligneDeCroisement && derniereLigne && ligneEnTrop) {
              listeLignesParcourues.push(ligneEnTrop);
              listeLignesParcourues.push(derniereLigne);
              const lignesDeLaBoucle: Line[] = this.conserverLignesBoucle(ligneDeCroisement, listeLignesParcourues);
              
              const listeCerclesEnnemis: Circle[] = this.serviceEnnemis.getListeCerclesEnnemis();
              const formeCreee: [] = this.serviceForme.verifierBoucleContientCercle(lignesDeLaBoucle, listeCerclesEnnemis);
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
        this.effacerHistoriqueCoordonneesCurseur();
        this.vaisseau.setFormeBoucle(forme);
        this.indexPhaseAnimation = this.nbFrameAnimation;    
        this.indexPhaseAnimation = this.nbFrameAnimation;    
    }   
    
    async effacerHistoriqueAvecLatence(ms: number) {
        if (ms > 0 ) {
          while (this.vaisseau.getHistoriquesCoordonneesCurseur().length > 0) {
            this.vaisseau.getHistoriquesCoordonneesCurseur().shift();
            await this.p5.sleep(ms);
          }
        } else {
          this.effacerHistoriqueCoordonneesCurseur();
        }
    }

    effacerHistoriqueCoordonneesCurseur() {
      this.vaisseau.setHistoriquesCoordonneesCurseur([]);
    }
}