import { Circle } from "./class/Circle";
import { Line } from "./class/Line";
import { Point } from "./class/Point";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
  
  const Collides = require("p5collide");
  const nbMaxLignes = 50;
  
  let pos_x: number = window.innerWidth / 2;
  let pos_y: number = window.innerHeight / 2;
  let pointeur_cercle = new Circle(pos_x, pos_y, 50);
  let timer: any;
    
  let indexPhaseAnimation = 0;
  let nbFrameAnimation = 10;
  let historiquesCoordonneesCurseur: Point[] = [];
  let formeBoucle: any[] = [];
  
  const pointTestCollision = new Point(pos_x, pos_y);

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

      formeBoucle = p.diminuerFormeDeMoitieVersLeCentre(formeBoucle);
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

  p.verifierCroisementLigneAvecListeLignes = (ligne: Line, lignes: Line[]) => {
    let ligneDeCroisement = null;
    lignes.forEach((l: Line) =>{
      const croisementExistant = p.verifierCroisementEntreDeuxLignes(ligne, l);
      if (croisementExistant) {
        ligneDeCroisement = l;        
      };
    });
    return ligneDeCroisement;
  }

  p.verifierCroisementEntreDeuxLignes = (ligne_a: Line, ligne_b: Line) => {
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

  p.verifierSiBoucleComplete = () => {
    if (historiquesCoordonneesCurseur.length >= 2) {
      let listeLignesParcourues = p.calculerLignesParcourues(historiquesCoordonneesCurseur);
      const derniereLigne = listeLignesParcourues.pop();
      const ligneEnTrop = listeLignesParcourues.pop();

      const ligneDeCroisement = p.verifierCroisementLigneAvecListeLignes(derniereLigne, listeLignesParcourues);
      
      if (ligneDeCroisement) {
          listeLignesParcourues.push(ligneEnTrop);
          listeLignesParcourues.push(derniereLigne);
          const lignesDeLaBoucle: Line[] = p.conserverLignesBoucle(ligneDeCroisement, listeLignesParcourues);
          
          const formeCreee: [] = p.verifierBoucleContientPoint(lignesDeLaBoucle, pointTestCollision);
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

  p.verifierBoucleContientPoint = (lignesDeLaBoucle: Line[], point: Point) => {
    const polygone: [] = p.formePolygonaleFromLines(lignesDeLaBoucle);
    const capture: boolean = Collides.collidePointPoly(point.getPosX(), point.getPosY(), polygone); 
    if (capture) {      
      console.log('Capture');
    }
    return polygone;
  }

  p.formePolygonaleFromLines = (lignesDeLaBoucle: Line[]) => {
    let polygone: any = [];
    lignesDeLaBoucle.forEach((ligne: Line) => {
      polygone.push(p.createVector(ligne.getPointA().getPosX(), ligne.getPointA().getPosY()));
      polygone.push(p.createVector(ligne.getPointB().getPosX(), ligne.getPointB().getPosY()));
    });

    return polygone;
  }

  p.validerBoucle = (forme: []) => {
    historiquesCoordonneesCurseur = [];
    formeBoucle = forme;
    indexPhaseAnimation = nbFrameAnimation;    
  }

  p.diminuerFormeDeMoitieVersLeCentre = (forme: any[]) => {  
    const pointCentral = p.trouverPointCentralFormeFermee(forme);
    let formeDiminuee: any[] = [];
    
    for (const { x, y } of forme) {
      const pointForme = new Point(x, y);
      const ligneAvecLeCentre = new Line(pointForme, pointCentral);
      const pointFormeDiminuee = p.trouverPointCentreLigne(ligneAvecLeCentre);
      formeDiminuee.push(p.createVector(pointFormeDiminuee.getPosX(), pointFormeDiminuee.getPosY()));
    }
    return formeDiminuee;
  }

  p.trouverPointCentralFormeFermee = (forme: any[]) => {
    const point_depart = new Point(forme[0].x, forme[0].y);
    const index_milieu = forme.length / 2;
    const point_milieu = new Point(forme[index_milieu].x, forme[index_milieu].y);
    
    const ligneReference = new Line(point_depart, point_milieu);
    return p.trouverPointCentreLigne(ligneReference);
  }

  p.diminuerLigneDeMoitie = (ligne: Line) => {
    
    const point_a = ligne.getPointA();
    const point_b = ligne.getPointB();

    const pointCentre = p.trouverPointCentreLigne(ligne);

    const ligne_point_a_point_centre = new Line(point_a, pointCentre);
    const ligne_point_centre_point_b = new Line(pointCentre, point_b);

    const pointCentre_a = p.trouverPointCentreLigne(ligne_point_a_point_centre);
    const pointCentre_b = p.trouverPointCentreLigne(ligne_point_centre_point_b);

    return new Line(pointCentre_a, pointCentre_b);

  }

  p.trouverPointCentreLigne = (ligne: Line) => {
    const point_a = ligne.getPointA();
    const point_b = ligne.getPointB();

    const pointCentreLigne_x = (point_a.getPosX() + point_b.getPosX()) / 2;
    const pointCentreLigne_y = (point_a.getPosY() + point_b.getPosY()) / 2;

    return new Point(pointCentreLigne_x, pointCentreLigne_y);
  }

}

