import { Point } from "./class/Point";
import { ServiceBombes } from "./services/ServiceBombes";
import { ServiceEnnemis } from "./services/serviceEnnemis";
import { ServiceFormes } from "./services/serviceFormes";
import { ServicePVs } from "./services/servicePV";
import { ServiceScore } from "./services/ServiceScore";
import { ServiceVaisseau } from "./services/serviceVaisseau";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
  
  const largeur_images_hud = window.innerWidth / 30;
  const hauteur_images_hud = window.innerHeight / 15;
  const score: number = 0;
  let timer: any;  
  
  let instanciationTerminee = false;

  // Calling p5.js functions, using the variable 'p'
  p.setup = async () => {

    p.serviceVaisseau = new ServiceVaisseau(p, p.mouseX, p.mouseY);
    p.serviceEnnemis = new ServiceEnnemis(p);
    p.serviceForme = new ServiceFormes(p);
    p.servicePVs = new ServicePVs(p, 5, largeur_images_hud, hauteur_images_hud);
    p.serviceBombes = new ServiceBombes(p, 3, largeur_images_hud, hauteur_images_hud);
    p.serviceScore = new ServiceScore(p, score);

    p.serviceEnnemis.instancierEnnemis();

    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);
    p.noCursor();
    
    instanciationTerminee = true;

  }

  p.draw = () => {
    // Clear the frame
    p.background(0, 1000)
    
    p.serviceScore.drawScorePartie();
    p.serviceScore.drawScores();
    p.servicePVs.drawPVs();
    p.serviceBombes.drawBombes();
    p.serviceEnnemis.drawEnnemis();
    p.serviceVaisseau.drawVaisseau();
      
  }

  p.mouseMoved = () => {
    p.gererDeplacementCurseur();
  }

  p.mouseDragged = () => {
    p.gererDeplacementCurseur();
  }

  p.gererDeplacementCurseur = () => {
    if (instanciationTerminee) {
      const point: Point = new Point(p.mouseX, p.mouseY);
      
      p.serviceVaisseau.gererDeplacementVaisseau(point);    
    }
  }

  p.mouseStopped = async () => {
    await p.serviceVaisseau.effacerHistoriqueAvecLatence(10);
    
  }
  
  p.sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }  

}

