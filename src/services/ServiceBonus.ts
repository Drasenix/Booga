import { ItemBouclier } from "../class/ItemBouclier";
import { Point } from "../class/Point";
import { Vaisseau } from "../class/Vaisseau";

export class ServiceBonus {

    private nbBonus: number;    
    private p5: any;
    private img_boucliers: any;
    private largeur_img: number;
    private hauteur_img: number;
    private itemsBoucliers: ItemBouclier[];
    

    constructor(p5: any, nbBonus: number, largeur_img: number, hauteur_img: number) {
        this.p5 = p5;
        this.nbBonus = nbBonus;
        this.img_boucliers = this.p5.loadImage('assets/img/bouclier.png');
        this.hauteur_img = hauteur_img;
        this.largeur_img = largeur_img;
        this.itemsBoucliers = [];
    }

    drawBonus() {
        for (let i =0; i < this.nbBonus; i++ ) {
            this.p5.image(this.img_boucliers, (i) * this.largeur_img, window.innerHeight - this.hauteur_img, this.largeur_img, this.hauteur_img);
        }
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
    }

    utiliserBouclier() {
        if (this.nbBonus) {
            this.nbBonus --;
            this.p5.serviceControleurPartie.getServiceVaisseau().rendreVaisseauInvincibleTemporairement(this.p5.serviceControleurPartie.getServiceVaisseau().getDureeBoucliers());
        }
    }

    faireApparaitreItemBouclier(point: Point) {
        const itemBouclier: ItemBouclier = new ItemBouclier(point);
        this.itemsBoucliers.push(itemBouclier);
    }

    validerCaptureItemBouclier(itemBouclier: ItemBouclier) {
        this.supprimerItemBouclier(itemBouclier);
        this.nbBonus ++;
    }

    supprimerItemBouclier(itemBouclier: ItemBouclier) {
        this.itemsBoucliers = this.itemsBoucliers.filter( (itemBouclierActuel: ItemBouclier) => {
            return itemBouclier !== itemBouclierActuel;
        })
    }

    public getNbBonus(): number {
        return this.nbBonus;
    }

    public setNbBonus(value: number) {
        this.nbBonus = value;
    }

    public getItemsBoucliers(): ItemBouclier[] {
        return this.itemsBoucliers;
    }
    public setItemsBoucliers(value: ItemBouclier[]) {
        this.itemsBoucliers = value;
    }


}