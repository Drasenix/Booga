import { Point } from "./class/Point";
import { ServiceControleurPartie } from "./services/ServiceControleurPartie";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
  
  
  let timer: any;  
  

  // Calling p5.js functions, using the variable 'p'
  p.setup = async () => {
    p.instanciationTerminee = false;
    p.serviceControleurPartie = new ServiceControleurPartie(p);         
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);
    p.noCursor();    

  }

  p.draw = () => {

    if (p.serviceControleurPartie.ispartiePerdue()) {
      p.drawPartiePerdue();
    } else {
      p.drawPartieEnCours();
    }
          
  }

  p.drawPartieEnCours= () => {
    // Clear the frame
    p.background(0, 1000)
        
    p.serviceControleurPartie.getServiceScore().drawScorePartie();
    p.serviceControleurPartie.getServiceScore().drawScores();
    p.serviceControleurPartie.getServicePVs().drawPVs();
    p.serviceControleurPartie.getServiceBombes().drawBombes();
    p.serviceControleurPartie.getServiceEnnemis().drawEnnemis();
    p.serviceControleurPartie.getServiceVaisseau().drawVaisseau();
  }

  p.drawPartiePerdue = () => {    
    p.serviceControleurPartie.getServiceMenus().drawPartiePerdue();
  }
  
  p.mouseMoved = () => {
    p.gererDeplacementCurseur();
  }

  p.mouseDragged = () => {
    p.gererDeplacementCurseur();
  }

  p.mouseClicked = () => {
    if (p.serviceControleurPartie.ispartiePerdue()) {
      p.serviceControleurPartie = p.serviceControleurPartie.relancerPartie();
    }
  }

  p.gererDeplacementCurseur = () => {
    if (p.instanciationTerminee) {
      const point: Point = new Point(p.mouseX, p.mouseY);
      
      p.serviceControleurPartie.getServiceVaisseau().gererDeplacementVaisseau(point);    
    }
  }

  p.mouseStopped = async () => {
    await p.serviceControleurPartie.getServiceVaisseau().effacerHistoriqueAvecLatence(10);
    
  }
  
  p.sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }  

}

