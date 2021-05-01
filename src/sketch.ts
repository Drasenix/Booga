import { Circle } from "./class/Circle";
import { Line } from "./class/Line";
import { Point } from "./class/Point";
import { ServiceEnnemis } from "./services/serviceEnnemis";
import { ServiceFormes } from "./services/serviceFormes";
import { ServiceVaisseau } from "./services/serviceVaisseau";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
      
  let pos_x: number = window.innerWidth / 2;
  let pos_y: number = window.innerHeight / 2;  
  let timer: any;  
  
  const serviceEnnemis = new ServiceEnnemis(p);
  const serviceVaisseau = new ServiceVaisseau(p, serviceEnnemis);

  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(255);
    p.noCursor();
    
    serviceVaisseau.instancierCurseur(pos_x, pos_y);
    serviceEnnemis.instancierEnnemis();
  }

  p.draw = () => {
    // Clear the frame
    p.background(255, 1000)
    
    serviceEnnemis.drawEnnemis();

    serviceVaisseau.drawVaisseau();
      
  }

  p.mouseMoved = () => {
    p.gererDeplacement();
  }

  p.mouseDragged = () => {
    p.gererDeplacement();
  }

  p.gererDeplacement  = () => {
    const point: Point = new Point(p.mouseX, p.mouseY);
    
    if (serviceVaisseau.pointeur_cercle) {
      serviceVaisseau.pointeur_cercle.setPosX(point.getPosX());
      serviceVaisseau.pointeur_cercle.setPosY(point.getPosY());
  
      serviceVaisseau.gererHistoriqueCoordonnes(point);
      
      serviceVaisseau.verifierSiBoucleComplete();
      clearTimeout(timer);
      timer=setTimeout(p.mouseStopped,200);
    }
  }

  p.mouseStopped = async () => {
    await serviceVaisseau.effacerHistoriqueAvecLatence(10);
    
  }
  
  p.sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }  

}

