import { Point } from "./class/Point";
import { ServiceControleurPartie } from "./services/ServiceControleurPartie";

// Exporting a function called 'mySketch'
export const boogaloopers = (p: any) => {
  
  
  let timer: any;  
  

  // Calling p5.js functions, using the variable 'p'
  p.setup = async () => {
    p.instanciationTerminee = false;
    p.serviceControleurPartie = new ServiceControleurPartie(p, 1);         
    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);
    p.noCursor();    

  }

  p.draw = () => {

    if (p.serviceControleurPartie.ispartiePerdue()) {
      p.drawPartiePerdue();
    } else if (p.serviceControleurPartie.isPartieGagnee()) {
      p.drawPartieGagnee();
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
    p.serviceControleurPartie.getServiceEnnemis().drawEnnemis();
    p.serviceControleurPartie.getServiceVaisseau().drawVaisseau();
    p.serviceControleurPartie.getServiceBonus().drawItems();
  }

  p.drawPartiePerdue = () => {    
    p.serviceControleurPartie.getServiceMenus().drawPartiePerdue();
  }
  
  p.drawPartieGagnee = () => {    
    p.serviceControleurPartie.getServiceMenus().drawPartieGagnee();
  }

  p.mouseMoved = () => {
    p.gererDeplacementCurseur();
  }

  p.mouseDragged = () => {
    p.gererDeplacementCurseur();
  }

  p.mouseClicked = () => {
    if (p.serviceControleurPartie.ispartiePerdue()) {
      p.serviceControleurPartie = p.serviceControleurPartie.instancierNouvellePartie();
    }

    if (p.serviceControleurPartie.isPartieGagnee()) {
      const niveauSuivant = p.serviceControleurPartie.getServiceNiveau().getNiveauActuel().getNumeroNiveau() + 1;
      p.serviceControleurPartie.lancerNouveauNiveau(niveauSuivant);
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

