import { ItemBouclier } from "../class/ItemBouclier";
import { ItemEnergie } from "../class/ItemEnergie";
import { Point } from "../class/Point";
import { Vaisseau } from "../class/Vaisseau";

export class ServiceBonus {

    private p5: any;
    private images_boucliers: any[];
    private images_energies: any[];
    private largeur_imgages_items: number;
    private hauteur_imgages_items: number;
    private itemsBoucliers: ItemBouclier[];
    private itemsEnergies: ItemEnergie[];
    
    private dureeBoucliers: number;
    private dureeBouclierDepart: number;
    private dureeBouclierCollision: number;  
    private dureeItemEnergie: number;

    private indexSpritesBoucliers: number;
    private nbSpritesBoucliers: number;
    private indexSpritesItemsBoucliers: number;
    private nbSpritesItemsBoucliers: number;
    private indexSpritesItemsEnergies: number;
    private nbSpritesItemsEnergies: number;
    private frequenceRafraichissementSprites: number;
    
    constructor(p5: any, largeur_images_items: number, hauteur_images_items: number) {
        this.p5 = p5;

        this.images_boucliers = [];
        this.images_energies = [];

        this.instancierImagesBoucliers();
        this.instancierImagesEnergies();

        this.hauteur_imgages_items = hauteur_images_items;
        this.largeur_imgages_items = largeur_images_items;
        this.itemsBoucliers = [];
        this.itemsEnergies = [];
        
        this.dureeBoucliers = 10000;
        this.dureeBouclierDepart = 1000;
        this.dureeBouclierCollision = 500;        
        this.dureeItemEnergie = 10000;

        this.indexSpritesBoucliers = 0
        this.nbSpritesBoucliers = 3
        this.indexSpritesItemsBoucliers = 0
        this.nbSpritesItemsBoucliers = 3
        this.indexSpritesItemsEnergies = 0
        this.nbSpritesItemsEnergies = 6
        this.frequenceRafraichissementSprites = 10;

    }

    drawBouclier(vaisseau: Vaisseau) {
        const indexSpriteBoucliers = this.calculerIndexSprite(this.indexSpritesBoucliers, this.frequenceRafraichissementSprites, this.nbSpritesBoucliers);
        this.p5.tint(255, 127);
        this.p5.image(
            this.images_boucliers[indexSpriteBoucliers],
            vaisseau.getPointeurCercle().getPosX() - vaisseau.getRayonCercle(),
            vaisseau.getPointeurCercle().getPosY() - vaisseau.getRayonCercle(),
            vaisseau.getRayonCercle() * 2,
            vaisseau.getRayonCercle() * 2 
        );
        this.indexSpritesBoucliers =  this.indexSpritesBoucliers + 1;
    }

    drawItems() {
        const indexSpriteItemsBoucliers = this.calculerIndexSprite(this.indexSpritesItemsBoucliers, this.frequenceRafraichissementSprites, this.nbSpritesItemsBoucliers);
        this.itemsBoucliers.forEach((itemBouclier: ItemBouclier) => {
            this.p5.image(
                this.images_boucliers[indexSpriteItemsBoucliers],
                itemBouclier.getPoint().getPosX(),
                itemBouclier.getPoint().getPosY(),
                this.largeur_imgages_items,
                this.hauteur_imgages_items                
            );
        });

        const indexSpritesItemsEnergies = this.calculerIndexSprite(this.indexSpritesItemsEnergies, this.frequenceRafraichissementSprites, this.nbSpritesItemsEnergies);
        this.itemsEnergies.forEach((itemEnergie: ItemEnergie) => {
            this.p5.image(
                this.images_energies[indexSpritesItemsEnergies],
                itemEnergie.getPoint().getPosX(),
                itemEnergie.getPoint().getPosY(),
                this.largeur_imgages_items,
                this.hauteur_imgages_items                
            );
        });

        this.indexSpritesItemsBoucliers = this.indexSpritesItemsBoucliers + 1 
        this.indexSpritesItemsEnergies =  this.indexSpritesItemsEnergies + 1;
    }

    calculerIndexSprite(indexSpriteActuel: number, frequenceRafraichissement: number, nbMax: number) {
        return Math.trunc( indexSpriteActuel / frequenceRafraichissement) % nbMax;
    }

    instancierImagesBoucliers() {
        const img_boucliers1 = this.p5.loadImage('assets/sprites/bouclier1.png');
        const img_boucliers2 = this.p5.loadImage('assets/sprites/bouclier2.png');
        const img_boucliers3 = this.p5.loadImage('assets/sprites/bouclier3.png');
        this.images_boucliers.push(img_boucliers1);
        this.images_boucliers.push(img_boucliers2);
        this.images_boucliers.push(img_boucliers3);
    }
    
    instancierImagesEnergies() {
        const img_energie1  = this.p5.loadImage('assets/sprites/energie1.png');
        const img_energie2  = this.p5.loadImage('assets/sprites/energie2.png');
        const img_energie3  = this.p5.loadImage('assets/sprites/energie3.png');
        const img_energie4  = this.p5.loadImage('assets/sprites/energie4.png');
        const img_energie5  = this.p5.loadImage('assets/sprites/energie5.png');
        const img_energie6  = this.p5.loadImage('assets/sprites/energie6.png');

        this.images_energies.push(img_energie1);
        this.images_energies.push(img_energie2);
        this.images_energies.push(img_energie3);
        this.images_energies.push(img_energie4);
        this.images_energies.push(img_energie5);
        this.images_energies.push(img_energie6);
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