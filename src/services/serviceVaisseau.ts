import { Ennemi } from "../class/Ennemi";
import { Line } from "../class/Line";
import { Multiplicateur } from "../class/Multiplicateur";
import { Point } from "../class/Point";
import { Score } from "../class/Score";
import { Vaisseau } from "../class/Vaisseau";

export class ServiceVaisseau {
    private p5: any;    
    private Collides: any = require("p5collide");
    
    private indexPhaseAnimation: number = 0;
    private nbFrameAnimation: number = 10;    
    private nbMaxLignes = 100;    
    private timerInvincibilite: any;
    
    private couleurVaisseau;

    private vaisseau: Vaisseau;    
  

    constructor(
      p5: any,
      pos_x: number,
      pos_y: number
    ) {
        this.p5 = p5;
        this.vaisseau = new Vaisseau(pos_x, pos_y);
        this.couleurVaisseau = this.p5.color(255, 255, 255);
    }

    drawFormeBoucle() {    
        if (this.vaisseau.getFormeBoucle().length > 0 && this.indexPhaseAnimation > 0) {
            this.p5.beginShape();
            for (const { x, y } of this.vaisseau.getFormeBoucle())  this.p5.vertex(x, y);
            this.p5.endShape(this.Collides.CLOSE);

            this.vaisseau.setFormeBoucle(
              this.p5.serviceControleurPartie.getServiceForme().diminuerFormeDeMoitieVersLeCentre(this.vaisseau.getFormeBoucle())
            );
            this.indexPhaseAnimation--;
        }
    }

    drawVaisseau() {
      this.drawFormeBoucle();    
      this.drawLines();
      
      this.p5.noStroke();
      
      this.p5.fill(this.couleurVaisseau);
      
      if (this.vaisseau.getPointeurCercle()) {
        this.p5.circle(this.vaisseau.getPointeurCercle().getPosX(), this.vaisseau.getPointeurCercle().getPosY(), this.vaisseau.getPointeurCercle().getRayon());
        if (this.vaisseau.isInvincible()) {
          this.p5.serviceControleurPartie.getServiceBonus().drawBouclier(this.vaisseau);
        }
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
      this.updateHistoriqueCoordonnes(point);
      this.verifierSiBoucleComplete();
      clearTimeout(this.p5.timer);
      this.p5.timer=setTimeout(this.p5.mouseStopped,200);
    }
    
    appliquerEffetsCollision() {
      this.effacerHistoriqueCoordonneesCurseur();
      this.rendreVaisseauInvincibleTemporairement(2000);
      this.p5.serviceControleurPartie.getServicePVs().reduirePVs();
      this.p5.serviceControleurPartie.getServiceScore().perdreScoreCollision(this.vaisseau.getPointeurCercle().getPosX(), this.vaisseau.getPointeurCercle().getPosY());
    }   

    rendreVaisseauInvincibleTemporairement(ms: number) {
      this.vaisseau.setInvincible(true);
      clearTimeout(this.timerInvincibilite);
      this.timerInvincibilite=setTimeout(() => this.vaisseau.setInvincible(false), ms);
    }

    updateHistoriqueCoordonnes(point: Point) {
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
    
          const ligneDeCroisement = this.p5.serviceControleurPartie.getServiceForme().verifierCroisementLigneAvecListeLignes(derniereLigne, listeLignesParcourues);
          
          if (ligneDeCroisement && derniereLigne && ligneEnTrop) {
              listeLignesParcourues.push(ligneEnTrop);
              listeLignesParcourues.push(derniereLigne);
              const lignesDeLaBoucle: Line[] = this.conserverLignesBoucle(ligneDeCroisement, listeLignesParcourues);
              
              const formeCreee: [] = this.verifierCaptureEnnemis(lignesDeLaBoucle, this.p5.serviceControleurPartie.getServiceEnnemis().getListeEnnemis());
              this.validerBoucle(formeCreee);
          }
        }
    }
    
    verifierCaptureEnnemis(lignesDeLaBoucle: Line[], ennemis: Ennemi[]) {
      const polygone: [] = this.p5.serviceControleurPartie.getServiceForme().formePolygonaleFromLines(lignesDeLaBoucle);
      
      let nbEnnemiCaptures = 0;

      ennemis.forEach((ennemi: Ennemi) => {
          const cercle_ennemi = ennemi.getEnnemiCercle();
          const capture: boolean = this.Collides.collidePointPoly(cercle_ennemi.getPosX(), cercle_ennemi.getPosY(), polygone); 
          
          if (capture) {
            nbEnnemiCaptures++;      
            this.p5.serviceControleurPartie.getServiceEnnemis().validerCaptureEnnemi(ennemi);
            
            const multiplicateur: Multiplicateur = new Multiplicateur(
              nbEnnemiCaptures,
              ennemi.getScore().getPoint().getPosX() + 100,
              ennemi.getScore().getPoint().getPosY() 
            );
            const combo: Score = multiplicateur.appliquerMultiplicateurSurScore(ennemi.getScore());            
            this.p5.serviceControleurPartie.getServiceScore().augmenterScoreGlobal(combo);
            this.p5.serviceControleurPartie.getServiceScore().ajouterScoreToDraw(combo);
            
            if (nbEnnemiCaptures > 1 ) {
              this.p5.serviceControleurPartie.getServiceScore().ajouterMultiplicateurToDraw(multiplicateur);
            }
          }
      });
      return polygone;
    }

    conserverLignesBoucle(ligneDeCroisement: Line, listeLignesParcourues: Line[]) {
        const indexLigneCroisement = listeLignesParcourues.indexOf(ligneDeCroisement);    
        let resultat = listeLignesParcourues.slice(indexLigneCroisement+1);
        resultat.pop();
        return resultat;
    }
    
    supprimerLignesParcouruesJusquaLigne(lignesParcourues: Line[], line: Line) {
      const indexLigne = lignesParcourues.indexOf(line);
      return lignesParcourues.slice(indexLigne);
    }

    verifierCollisionAvecEnnemi(ennemi: Ennemi) {
      let collision = false;
      if (!this.vaisseau.isInvincible()) {
        collision = this.p5.serviceControleurPartie.getServiceForme().verifierCercleVaisseauCollidesCercleEnnemi(this.vaisseau.getPointeurCercle(), ennemi.getEnnemiCercle());
          
      }

      if (collision) {
        this.appliquerEffetsCollision();    
    }

      return collision;
    }

    verifierCollisionEnnemiAvecLigneVaisseau(ennemi: Ennemi) {
      const listeLignesParcourues: Line[] = this.calculerLignesParcourues(this.vaisseau.getHistoriquesCoordonneesCurseur());
      const cercleEnnemi = ennemi.getEnnemiCercle();

      const ligneEnCollision = listeLignesParcourues.find((ligne: Line) => {
        return this.p5.serviceControleurPartie.getServiceForme().verifierCercleEnnemiCollideLigne(cercleEnnemi, ligne);
      });

      if (ligneEnCollision) {
        this.vaisseau.supprimerHistoriqueCoordonneesJusquaLigne(ligneEnCollision);
      }
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

    public getVaisseau(): Vaisseau {
      return this.vaisseau;
    }

    public setVaisseau(value: Vaisseau) {
      this.vaisseau = value;
    }
}