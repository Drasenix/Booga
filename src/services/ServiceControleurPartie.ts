
import { ServiceBonus } from "./ServiceBonus";
import { ServiceEnnemis } from "./serviceEnnemis";
import { ServiceFormes } from "./serviceFormes";
import { ServiceMenus } from "./ServiceMenus";
import { ServiceNiveau } from "./ServiceNiveau";
import { ServicePVs } from "./servicePV";
import { ServiceScore } from "./ServiceScore";
import { ServiceVaisseau } from "./serviceVaisseau";


export class ServiceControleurPartie {

    private largeur_images_hud;
    private hauteur_images_hud;
    private score: number;

    private p5: any;
    private serviceMenus: ServiceMenus;    
    private serviceVaisseau: ServiceVaisseau;
    private serviceEnnemis: ServiceEnnemis;
    private serviceForme: ServiceFormes;
    private servicePVs: ServicePVs;
    private serviceBonuss: ServiceBonus;        
    private serviceScore: ServiceScore;
    private serviceNiveau: ServiceNiveau;
    
    
    private partiePerdue: boolean;
    private partieGagnee: boolean;
        

    constructor(p5: any, numeroNiveau: number) {
        this.p5 = p5;     

        this.largeur_images_hud = window.innerWidth / 30;
        this.hauteur_images_hud = window.innerHeight / 15;
        this.score = 0;
        this.partiePerdue = false;
        this.partieGagnee = false;
        this.p5.instanciationTerminee = false;

        this.serviceMenus = new ServiceMenus(this.p5);
        this.serviceNiveau = new ServiceNiveau(this.p5);
        this.serviceVaisseau = new ServiceVaisseau(this.p5, this.p5.mouseX, this.p5.mouseY);
        this.serviceEnnemis = new ServiceEnnemis(this.p5);
        this.serviceForme = new ServiceFormes(this.p5);
        this.servicePVs = new ServicePVs(this.p5, 2, this.largeur_images_hud, this.hauteur_images_hud);
        this.serviceBonuss = new ServiceBonus(this.p5, 3, this.largeur_images_hud, this.hauteur_images_hud);
        this.serviceScore = new ServiceScore(this.p5, this.score);

        this.serviceNiveau.instancierNumeroNiveau(numeroNiveau);
        this.serviceEnnemis.instancierEnnemis(this.serviceNiveau.getNiveauActuel().getNbEnnemis());
        this.serviceVaisseau.rendreVaisseauInvincibleTemporairement(1000);
        this.p5.instanciationTerminee = true;
    }

    instancierNouvellePartie() {
        return new ServiceControleurPartie(this.p5, 1);
    }
    
    instancierNouvellePartieAuNiveau(numeroNiveau: number) {
        return new ServiceControleurPartie(this.p5, numeroNiveau);
    }

    relancerNiveau() {
        return new ServiceControleurPartie(this.p5, this.serviceNiveau.getNiveauActuel().getNumeroNiveau());
    }

    lancerNouveauNiveau(numeroNiveau: number) {
        this.partiePerdue = false;
        this.partieGagnee = false;
        this.serviceNiveau.instancierNumeroNiveau(numeroNiveau);
        this.serviceVaisseau = new ServiceVaisseau(this.p5, this.p5.mouseX, this.p5.mouseY);
        this.serviceEnnemis.instancierEnnemis(this.serviceNiveau.getNiveauActuel().getNbEnnemis());
        this.serviceVaisseau.rendreVaisseauInvincibleTemporairement(1000);
    }

    perdrePartie() {
        this.partiePerdue = true;
    }

    gagnerPartie() {
        this.partieGagnee = true;
    }
 
    public ispartiePerdue(): boolean {
        return this.partiePerdue;
    }

    public getServiceMenus(): ServiceMenus {
        return this.serviceMenus;
    }
    public setServiceMenus(value: ServiceMenus) {
        this.serviceMenus = value;
    }

    public getServiceVaisseau(): ServiceVaisseau {
        return this.serviceVaisseau;
    }
    public setServiceVaisseau(value: ServiceVaisseau) {
        this.serviceVaisseau = value;
    }
    public getServiceEnnemis(): ServiceEnnemis {
        return this.serviceEnnemis;
    }
    public setServiceEnnemis(value: ServiceEnnemis) {
        this.serviceEnnemis = value;
    }
    public getServiceForme(): ServiceFormes {
        return this.serviceForme;
    }
    public setServiceForme(value: ServiceFormes) {
        this.serviceForme = value;
    }
    public getServicePVs(): ServicePVs {
        return this.servicePVs;
    }
    public setServicePVs(value: ServicePVs) {
        this.servicePVs = value;
    }
    public getServiceBombes(): ServiceBonus {
        return this.serviceBonuss;
    }
    public setServiceBombes(value: ServiceBonus) {
        this.serviceBonuss = value;
    }
    public getServiceScore(): ServiceScore {
        return this.serviceScore;
    }
    public setServiceScore(value: ServiceScore) {
        this.serviceScore = value;
    }
    public getServiceNiveau(): ServiceNiveau {
        return this.serviceNiveau;
    }
    public setServiceNiveau(value: ServiceNiveau) {
        this.serviceNiveau = value;
    }   
    public isPartieGagnee(): boolean {
        return this.partieGagnee;
    }
    public setPartieGagnee(value: boolean) {
        this.partieGagnee = value;
    }
}