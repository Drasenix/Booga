import { Circle } from "./class/Circle";
import { Line } from "./class/Line";
import { Point } from "./class/Point";
import { ServiceFormes } from "./services/serviceFormes";
import { ServiceLigneVaisseau } from "./services/serviceLigneVaisseau";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
      
  let pos_x: number = window.innerWidth / 2;
  let pos_y: number = window.innerHeight / 2;
  let pointeur_cercle = new Circle(pos_x, pos_y, 50);
  let timer: any;  
  
  const pointTestCollision = new Point(pos_x, pos_y);
  const serviceLigneVaisseau = new ServiceLigneVaisseau(p, pointTestCollision);

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
    
    serviceLigneVaisseau.drawFormeBoucle();    

    serviceLigneVaisseau.drawLines();
    
    p.noStroke();
    p.circle(pointeur_cercle.getPosX(), pointeur_cercle.getPosY(), pointeur_cercle.getRayon())
    p.fill(0, 0, 0);

    p.circle(pointTestCollision.getPosX(), pointTestCollision.getPosY(), 20);
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

    serviceLigneVaisseau.gererHistoriqueCoordonnes(point);
    
    serviceLigneVaisseau.verifierSiBoucleComplete();
    clearTimeout(timer);
    timer=setTimeout(p.mouseStopped,200);
  }

  p.mouseStopped = async () => {
    await serviceLigneVaisseau.effacerHistoriqueAvecLatence(10);
    
  }
  
  p.sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }  

}

