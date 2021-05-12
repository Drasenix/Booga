import { ItemBouclier } from "../class/ItemBouclier";
import { ItemEnergie } from "../class/ItemEnergie";
import { Point } from "../class/Point";
import { Vaisseau } from "../class/Vaisseau";

export class ServiceBonus {

    private p5: any;
    private img_boucliers: any;
    private img_energies: any;
    private largeur_img: number;
    private hauteur_img: number;
    private itemsBoucliers: ItemBouclier[];
    private itemsEnergies: ItemEnergie[];
    
    private dureeBoucliers: number;
    private dureeBouclierDepart: number;
    private dureeBouclierCollision: number;  
    private dureeItemEnergie: number;

    
        
    constructor(p5: any, largeur_img: number, hauteur_img: number) {
        this.p5 = p5;
        this.img_boucliers = this.p5.loadImage('assets/img/bouclier.png');
        this.img_energies = this.p5.loadImage('assets/img/energie.png');
        this.hauteur_img = hauteur_img;
        this.largeur_img = largeur_img;
        this.itemsBoucliers = [];
        this.itemsEnergies = [];
        
        this.dureeBoucliers = 10000;
        this.dureeBouclierDepart = 1000;
        this.dureeBouclierCollision = 500;
        
        this.dureeItemEnergie = 10000;
    }

    drawBouclier(vaisseau: Vaisseau) {
        this.p5.tint(255, 127);
        this.p5.image(
            this.img_boucliers,
            vaisseau.getPointeurCercle().getPosX() - vaisseau.getRayonCercle(),
            vaisseau.getPointeurCercle().getPosY() - vaisseau.getRayonCercle(),
            vaisseau.getRayonCercle() * 2,
            vaisseau.getRayonCercle() * 2 
        );
    }

    drawItems() {
        this.itemsBoucliers.forEach((itemBouclier: ItemBouclier) => {
            this.p5.image(
                this.img_boucliers,
                itemBouclier.getPoint().getPosX(),
                itemBouclier.getPoint().getPosY(),
                this.largeur_img,
                this.hauteur_img                
            );
        });

        this.itemsEnergies.forEach((itemEnergie: ItemEnergie) => {
            this.p5.image(
                this.img_energies,
                itemEnergie.getPoint().getPosX(),
                itemEnergie.getPoint().getPosY(),
                this.largeur_img,
                this.hauteur_img                
            );
        });

    }

    faireApparaitreItemBouclier(point: Point) {
        const itemBouclier: ItemBouclier = new ItemBouclier(point);
        this.itemsBoucliers.push(itemBouclier);
    }
    
    faireApparaitreItemEnergie(point: Point) {
        const itemEnergie: ItemEnergie = new ItemEnergie(point);
        this.itemsEnergies.push(itemEnergie);
    }

    validerCaptureItemBouclier(itemBouclier: ItemBouclier) {
        this.supprimerItemBouclier(itemBouclier);
        this.p5.serviceControleurPartie.getServiceVaisseau().rendreVaisseauInvincibleTemporairement(this.dureeBoucliers);
    }

    validerCaptureItemEnergie(itemEnergie: ItemEnergie) {
        this.supprimerItemEnergie(itemEnergie);
        this.p5.serviceControleurPartie.getServiceVaisseau().augmenterNbLignesVaisseauTemporairement(this.dureeItemEnergie);
    }

    supprimerItemBouclier(itemBouclier: ItemBouclier) {
        this.itemsBoucliers = this.itemsBoucliers.filter( (itemBouclierActuel: ItemBouclier) => {
            return itemBouclier !== itemBouclierActuel;
        })
    }

    supprimerItemEnergie(itemEnergie: ItemEnergie) {
        this.itemsEnergies = this.itemsEnergies.filter( (itemEnergieActuel: ItemEnergie) => {
            return itemEnergie !== itemEnergieActuel;
        })
    }

    public getItemsBoucliers(): ItemBouclier[] {
        return this.itemsBoucliers;
    }
    public setItemsBoucliers(value: ItemBouclier[]) {
        this.itemsBoucliers = value;
    }

    public getItemsEnergies(): ItemEnergie[] {
        return this.itemsEnergies;
    }
    public setItemsEnergies(value: ItemEnergie[]) {
        this.itemsEnergies = value;
    }

    public getDureeBoucliers(): number {
        return this.dureeBoucliers;
    }
    public setDureeBoucliers(value: number) {
        this.dureeBoucliers = value;
    }

    public getDureeBouclierDepart(): number {
        return this.dureeBouclierDepart;
    }
    public setDureeBouclierDepart(value: number) {
        this.dureeBouclierDepart = value;
    }

    public getDureeBouclierCollision(): number {
        return this.dureeBouclierCollision;
    }
    public setDureeBouclierCollision(value: number) {
        this.dureeBouclierCollision = value;
    }

    public getDureeItemEnergie(): number {
        return this.dureeItemEnergie;
    }
    public setDureeItemEnergie(value: number) {
        this.dureeItemEnergie = value;
    }
}