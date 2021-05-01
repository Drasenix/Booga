import { FORMERR } from "node:dns";
import { Line } from "./class/Line";
import { Point } from "./class/Point";

// Exporting a function called 'mySketch'
export const test = (p: any) => {
  
  const Collides = require("p5collide");

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
    
    let ligne_a_point_a = new Point(1000, 100);
    let ligne_a_point_b = new Point(500, 10);
    
    let ligne_b_point_a = ligne_a_point_b
    let ligne_b_point_b = new Point(600,240);
    
    let ligne_c_point_a = ligne_b_point_b
    let ligne_c_point_b = new Point(1000,300);

    let ligne_a = new Line(ligne_a_point_a, ligne_a_point_b);
    let ligne_b = new Line(ligne_b_point_a, ligne_b_point_b);
    let ligne_c = new Line(ligne_c_point_a, ligne_c_point_b);

    let ligneDiminuee_a: Line = p.diminuerLigneDeMoitie(ligne_a);
    let ligneDiminuee_b: Line = p.diminuerLigneDeMoitie(ligne_b);
    let ligneDiminuee_c: Line = p.diminuerLigneDeMoitie(ligne_c);


    let lignes: Line[] = [];

    lignes.push(ligne_a);
    lignes.push(ligne_b);
    lignes.push(ligne_c);



    let formeFinale: any[] = p.formePolygonaleFromLines(lignes);
    
    p.fill(0, 0, 0);
    p.beginShape(p.LINES);
    for (const { x, y } of formeFinale)  p.vertex(x, y);
    p.endShape(Collides.CLOSE);

    let formeFinaleDiminuee = p.diminuerFormeDeMoitieVersLeCentre(formeFinale);



    p.fill(0, 0, 0);
    p.beginShape(p.LINES);
    for (const { x, y } of formeFinaleDiminuee)  p.vertex(x, y);
    p.endShape(Collides.CLOSE);

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

  p.formePolygonaleFromLines = (lignesDeLaBoucle: Line[]) => {
    let polygone: any = [];
    lignesDeLaBoucle.forEach((ligne: Line) => {
      polygone.push(p.createVector(ligne.getPointA().getPosX(), ligne.getPointA().getPosY()));
      polygone.push(p.createVector(ligne.getPointB().getPosX(), ligne.getPointB().getPosY()));
    });

    return polygone;
  }
}
