import { ItemBouclier } from "../class/ItemBouclier";
import { ItemEnergie } from "../class/ItemEnergie";
import { ItemGel } from "../class/ItemGel";
import { Point } from "../class/Point";
import { Vaisseau } from "../class/Vaisseau";

export class ServiceBonus {

    private p5: any;
    private images_boucliers: any[];
    private images_energies: any[];
    private images_gels: any[];

    private largeur_images_items: number;
    private hauteur_images_items: number;
    private itemsBoucliers: ItemBouclier[];
    private itemsEnergies: ItemEnergie[];
    private itemsGels: ItemGel[];
    
    private dureeBouclierDepart: number;
    private dureeBouclierCollision: number;  
    private dureeItemBouclier: number;
    private dureeItemEnergie: number;
    private dureeItemGel: number;

    private indexSpritesBoucliers: number;
    private nbSpritesBoucliers: number;
    private indexSpritesItemsBoucliers: number;
    private nbSpritesItemsBoucliers: number;
    private indexSpritesItemsEnergies: number;
    private nbSpritesItemsEnergies: number;
    private indexSpritesItemsGels: number;
    private nbSpritesItemsGels: number;

    private frequenceRafraichissementSprites: number;
    
    constructor(p5: any, largeur_images_items: number, hauteur_images_items: number) {
        this.p5 = p5;

        this.images_boucliers = [];
        this.images_energies = [];
        this.images_gels = [];

        this.instancierImagesBoucliers();
        this.instancierImagesEnergies();
        this.instancierImagesGels();

        this.hauteur_images_items = hauteur_images_items;
        this.largeur_images_items = largeur_images_items;
        this.itemsBoucliers = [];
        this.itemsEnergies = [];
        this.itemsGels = [];

        this.dureeBouclierDepart = 1000;
        this.dureeBouclierCollision = 500;                
        this.dureeItemBouclier = 10000;
        this.dureeItemEnergie = 10000;
        this.dureeItemGel = 10000;

        this.indexSpritesBoucliers = 0;
        this.nbSpritesBoucliers = 3;
        this.indexSpritesItemsBoucliers = 0;
        this.nbSpritesItemsBoucliers = 3;
        this.indexSpritesItemsEnergies = 0;
        this.nbSpritesItemsEnergies = 6;
        this.indexSpritesItemsGels = 0;
        this.nbSpritesItemsGels = 4;

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
                this.largeur_images_items,
                this.hauteur_images_items                
            );
        });

        const indexSpritesItemsEnergies = this.calculerIndexSprite(this.indexSpritesItemsEnergies, this.frequenceRafraichissementSprites, this.nbSpritesItemsEnergies);
        this.itemsEnergies.forEach((itemEnergie: ItemEnergie) => {
            this.p5.image(
                this.images_energies[indexSpritesItemsEnergies],
                itemEnergie.getPoint().getPosX(),
                itemEnergie.getPoint().getPosY(),
                this.largeur_images_items,
                this.hauteur_images_items                
            );
        });

        const indexSpritesItemsGels = this.calculerIndexSprite(this.indexSpritesItemsGels, this.frequenceRafraichissementSprites, this.nbSpritesItemsGels);
        this.itemsGels.forEach((itemGel: ItemGel) => {
            this.p5.image(
                this.images_gels[indexSpritesItemsGels],
                itemGel.getPoint().getPosX(),
                itemGel.getPoint().getPosY(),
                this.largeur_images_items,
                this.hauteur_images_items                
            );
        });

        this.indexSpritesItemsBoucliers = this.indexSpritesItemsBoucliers + 1 
        this.indexSpritesItemsEnergies =  this.indexSpritesItemsEnergies + 1;
        this.indexSpritesItemsGels =  this.indexSpritesItemsGels + 1;
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

    instancierImagesGels() {
        const img_gel1 = this.p5.loadImage('assets/sprites/snowflake1.png');
        const img_gel2 = this.p5.loadImage('assets/sprites/snowflake2.png');
        const img_gel3 = this.p5.loadImage('assets/sprites/snowflake3.png');
        const img_gel4 = this.p5.loadImage('assets/sprites/snowflake4.png');

        this.images_gels.push(img_gel1);
        this.images_gels.push(img_gel2);
        this.images_gels.push(img_gel3);
        this.images_gels.push(img_gel4);
    }

    faireApparaitreItemBouclier(point: Point) {
        const itemBouclier: ItemBouclier = new ItemBouclier(point);
        this.itemsBoucliers.push(itemBouclier);
    }
    
    faireApparaitreItemEnergie(point: Point) {
        const itemEnergie: ItemEnergie = new ItemEnergie(point);
        this.itemsEnergies.push(itemEnergie);
    }

    faireApparaitreItemGel(point: Point) {
        const itemGel: ItemGel = new ItemGel(point);
        this.itemsGels.push(itemGel);
    }

    validerCaptureItemBouclier(itemBouclier: ItemBouclier) {
        this.supprimerItemBouclier(itemBouclier);
        this.p5.serviceControleurPartie.getServiceVaisseau().rendreVaisseauInvincibleTemporairement(this.dureeItemBouclier);
    }

    validerCaptureItemEnergie(itemEnergie: ItemEnergie) {
        this.supprimerItemEnergie(itemEnergie);
        this.p5.serviceControleurPartie.getServiceVaisseau().augmenterNbLignesVaisseauTemporairement(this.dureeItemEnergie);
    }

    validerCaptureItemGel(itemGel: ItemGel) {
        this.supprimerItemGel(itemGel);
        this.p5.serviceControleurPartie.getServiceEnnemis().gelerEnnemis(this.dureeItemGel);
        
    }

    supprimerItemBouclier(itemBouclier: ItemBouclier) {
        this.itemsBoucliers = this.itemsBoucliers.filter( (itemBouclierActuel: ItemBouclier) => {
            return itemBouclier !== itemBouclierActuel;
        });
    }

    supprimerItemEnergie(itemEnergie: ItemEnergie) {
        this.itemsEnergies = this.itemsEnergies.filter( (itemEnergieActuel: ItemEnergie) => {
            return itemEnergie !== itemEnergieActuel;
        });
    }

    supprimerItemGel(itemGel: ItemGel) {
        this.itemsGels = this.itemsGels.filter( (itemGelActuel: ItemGel) => {
            return itemGel !== itemGelActuel;
        });
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
        return this.dureeItemBouclier;
    }
    public setDureeBoucliers(value: number) {
        this.dureeItemBouclier = value;
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
    public getImages_gels(): any[] {
        return this.images_gels;
    }
    public setImages_gels(value: any[]) {
        this.images_gels = value;
    }

    public getItemsGels(): ItemGel[] {
        return this.itemsGels;
    }
    public setItemsGels(value: ItemGel[]) {
        this.itemsGels = value;
    }
}