import { Point } from "./class/Point";
import { ServiceEnnemis } from "./services/serviceEnnemis";
import { ServicePVs } from "./services/servicePV";
import { ServiceVaisseau } from "./services/serviceVaisseau";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
      
  let pos_x: number = window.innerWidth / 2;
  let pos_y: number = window.innerHeight / 2;  
  let timer: any;  
  let imgPV;

  const serviceEnnemis: ServiceEnnemis = new ServiceEnnemis(p);;
  const serviceVaisseau: ServiceVaisseau = new ServiceVaisseau(p, serviceEnnemis, pos_x, pos_y);;
  const servicePVs: ServicePVs = new ServicePVs(p, 5);;
  
  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(255);
    p.noCursor();
    
    serviceEnnemis.instancierEnnemis();
  }

  p.draw = () => {
    // Clear the frame
    p.background(255, 1000)
    
    servicePVs.drawPVs();
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
    
    serviceVaisseau.gererDeplacementVaisseau(point);    
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

