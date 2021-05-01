import { Circle } from "./class/Circle";
import { Line } from "./class/Line";
import { Point } from "./class/Point";
import { ServiceFormes } from "./services/serviceFormes";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
  
  const Collides = require("p5collide");
  const nbMaxLignes = 100;
  
  let pos_x: number = window.innerWidth / 2;
  let pos_y: number = window.innerHeight / 2;
  let pointeur_cercle = new Circle(pos_x, pos_y, 50);
  let timer: any;
    
  let indexPhaseAnimation = 0;
  let nbFrameAnimation = 10;
  let historiquesCoordonneesCurseur: Point[] = [];
  let formeBoucle: any[] = [];
  
  const pointTestCollision = new Point(pos_x, pos_y);

  const serviceForme = new ServiceFormes(p);

  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(255);
    p.noCursor();    
  }

  p.draw = () => {
    // Clear the frame
    p.background(255, 1000)
    
    p.drawFormeBoucle();    

    p.drawLines();
    
    p.noStroke();
    p.circle(pointeur_cercle.getPosX(), pointeur_cercle.getPosY(), pointeur_cercle.getRayon())
    p.fill(0, 0, 0);

    p.circle(pointTestCollision.getPosX(), pointTestCollision.getPosY(), 20);
  }

  p.drawFormeBoucle = () => {    
    if (formeBoucle.length > 0 && indexPhaseAnimation > 0) {
      p.beginShape();
      for (const { x, y } of formeBoucle)  p.vertex(x, y);
      p.endShape(Collides.CLOSE);

      formeBoucle = serviceForme.diminuerFormeDeMoitieVersLeCentre(formeBoucle);
      indexPhaseAnimation--;
    }
  }

  p.drawLines = () => {
    if (historiquesCoordonneesCurseur.length >= 2) {
      const listeLignesParcourues = p.calculerLignesParcourues(historiquesCoordonneesCurseur);
      
      (listeLignesParcourues).forEach((ligne: Line) => {
        p.strokeWeight(5);
        p.stroke(0,0,0);        
        p.line(ligne.getPointA().getPosX(), ligne.getPointA().getPosY(), ligne.getPointB().getPosX(), ligne.getPointB().getPosY());
      });
    }
  }

  p.mouseMoved = () => {
    p.gererDeplacement();
  }

  p.mouseDragged = () => {
    p.gererDeplacement();
  }

  p.gererDeplacement  = () => {
    const point: Point = new Point(p.mouseX, p.mouseY);

    pointeur_cercle.setPosX(point.getPosX());
    pointeur_cercle.setPosY(point.getPosY());

    p.gererHistoriqueCoordonnes(point);
    
    p.verifierSiBoucleComplete();
    clearTimeout(timer);
    timer=setTimeout(p.mouseStopped,200);
  }

  p.mouseStopped = async () => {
    await p.effacerHistoriqueAvecLatence(10);
    
  }

  p.effacerHistoriqueAvecLatence = async (ms: number) => {
    if (ms > 0 ) {
      while (historiquesCoordonneesCurseur.length > 0) {
        historiquesCoordonneesCurseur.shift();
        await p.sleep(ms);
      }
    } else {
      historiquesCoordonneesCurseur = [];
    }
  }

  p.sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  p.gererHistoriqueCoordonnes = (point: Point) => {
    if (historiquesCoordonneesCurseur.length === nbMaxLignes) {
      historiquesCoordonneesCurseur.shift();
    }
    historiquesCoordonneesCurseur.push(point);
  }

  p.calculerLignesParcourues = (listePoints: Point[]) => {
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

  p.verifierSiBoucleComplete = () => {
    if (historiquesCoordonneesCurseur.length >= 2) {
      let listeLignesParcourues = p.calculerLignesParcourues(historiquesCoordonneesCurseur);
      const derniereLigne = listeLignesParcourues.pop();
      const ligneEnTrop = listeLignesParcourues.pop();

      const ligneDeCroisement = serviceForme.verifierCroisementLigneAvecListeLignes(derniereLigne, listeLignesParcourues);
      
      if (ligneDeCroisement) {
          listeLignesParcourues.push(ligneEnTrop);
          listeLignesParcourues.push(derniereLigne);
          const lignesDeLaBoucle: Line[] = p.conserverLignesBoucle(ligneDeCroisement, listeLignesParcourues);
          
          const formeCreee: [] = serviceForme.verifierBoucleContientPoint(lignesDeLaBoucle, pointTestCollision);
          p.validerBoucle(formeCreee);
      }
    }
  }

  p.conserverLignesBoucle = (ligneDeCroisement: Line, listeLignesParcourues: Line[]) => {
    const indexLigneCroisement = listeLignesParcourues.indexOf(ligneDeCroisement);    
    let resultat = listeLignesParcourues.slice(indexLigneCroisement+1);
    resultat.pop();
    return resultat;
  }
  
  p.validerBoucle = (forme: []) => {
    historiquesCoordonneesCurseur = [];
    formeBoucle = forme;
    indexPhaseAnimation = nbFrameAnimation;    
  }

}

