import { Ennemi } from "../class/Ennemi";
import { EnnemiBleu } from "../class/EnnemiBleu";
import { EnnemiLimace } from "../class/EnnemiLimace";
import { EnnemiPieuvre } from "../class/EnnemiPieuvre";
import { Point } from "../class/Point";

export class ServiceEnnemis {
    private p5: any;    

    private images_ennemis_bleus: any[];
    private images_ennemis_limaces: any[];
    private images_ennemis_pieuvres: any[];

    private listeEnnemis: Ennemi[] = [];    
    
    private timerGel: any;

    private indexSpritesEnnemisBleus: number;
    private nbSpritesEnnemisBleus: number;
    private indexSpritesEnnemisLimaces: number;
    private nbSpritesEnnemisLimaces: number;
    private indexSpritesEnnemisPieuvres: number;
    private nbSpritesEnnemisPieuvres: number;

    private frequenceRafraichissementSprites: number;
    constructor(p5: any) {
        this.p5 = p5;

        this.images_ennemis_bleus = [];
        this.images_ennemis_limaces = [];
        this.images_ennemis_pieuvres = [];

        this.instancierImagesEnnemis();

        this.indexSpritesEnnemisBleus = 0;
        this.nbSpritesEnnemisBleus = 3;
        this.indexSpritesEnnemisLimaces = 0;
        this.nbSpritesEnnemisLimaces = 4;
        this.indexSpritesEnnemisPieuvres = 0;
        this.nbSpritesEnnemisPieuvres = 4;

        this.frequenceRafraichissementSprites = 10;
    }

    instancierEnnemis(nbEnnemis: number) {

        let point_ennemi_actuel: Point;
        const hauteur_fenetre = window.innerHeight;
        const largeur_fenetre = window.innerWidth;

        for (let i = 0; i < nbEnnemis;  i++) {
            point_ennemi_actuel = new Point(Math.random() * largeur_fenetre, Math.random() * hauteur_fenetre);            
            this.listeEnnemis.push(this.instancierTypeEnnemiAleatoire(point_ennemi_actuel));
        }
    }

    private instancierTypeEnnemiAleatoire(point: Point) : Ennemi{
        const random = Math.floor(Math.random() * 3) + 1;
        let ennemi: Ennemi;
        switch (random) {
            case 1:
                ennemi = new EnnemiBleu(point);
                break;
            case 2:
                ennemi = new EnnemiLimace(point);
                break;
            case 3:
                ennemi = new EnnemiPieuvre(point);
                break;
            default:
                ennemi = new Ennemi(point);
                break;
        }
        return ennemi;
    }

    updatePositionEnnemis() {
        this.listeEnnemis = this.listeEnnemis.map( (ennemi: Ennemi) => {
            ennemi.updatePosition();
            
            const collisionVaisseau = this.p5.serviceControleurPartie.getServiceVaisseau().verifierCollisionAvecEnnemi(ennemi);
            this.p5.serviceControleurPartie.getServiceVaisseau().verifierCollisionEnnemiAvecLigneVaisseau(ennemi);

            if (collisionVaisseau) {
                this.appliquerEffetsCollision(ennemi);       
            }
                        
            return ennemi;
        });
    }

    appliquerEffetsCollision(ennemi: Ennemi) {
        ennemi.inverserVelocite();
    }
    
    drawEnnemis() {
        this.updatePositionEnnemis();

        this.p5.fill(255, 255, 255);
        this.listeEnnemis.forEach((ennemi: Ennemi) => {
            const typeEnnemi = ennemi.constructor.name;
            switch (typeEnnemi) {
                case 'EnnemiBleu':
                    const indexSpriteEnnemisBleus = this.calculerIndexSprite(this.indexSpritesEnnemisBleus, this.frequenceRafraichissementSprites, this.nbSpritesEnnemisBleus);
                    this.p5.image(
                        this.images_ennemis_bleus[indexSpriteEnnemisBleus],
                        ennemi.getEnnemiCercle().getPosX() - ennemi.getEnnemiCercle().getRayon()/2,
                        ennemi.getEnnemiCercle().getPosY() - ennemi.getEnnemiCercle().getRayon()/2,
                        ennemi.getEnnemiCercle().getRayon(),
                        ennemi.getEnnemiCercle().getRayon()       
                    );
                    this.indexSpritesEnnemisBleus = this.indexSpritesEnnemisBleus + 1;
                    break;
                case 'EnnemiLimace':
                    const indexSpriteEnnemisLimaces = this.calculerIndexSprite(this.indexSpritesEnnemisLimaces, this.frequenceRafraichissementSprites, this.nbSpritesEnnemisLimaces);
                    this.p5.image(
                        this.images_ennemis_limaces[indexSpriteEnnemisLimaces],
                        ennemi.getEnnemiCercle().getPosX() - ennemi.getEnnemiCercle().getRayon()/2,
                        ennemi.getEnnemiCercle().getPosY() - ennemi.getEnnemiCercle().getRayon()/2,
                        ennemi.getEnnemiCercle().getRayon(),
                        ennemi.getEnnemiCercle().getRayon()      
                    );
                    this.indexSpritesEnnemisLimaces = this.indexSpritesEnnemisLimaces + 1;
                    break;
                case 'EnnemiPieuvre':
                    const indexSpriteEnnemisPieuvres = this.calculerIndexSprite(this.indexSpritesEnnemisPieuvres, this.frequenceRafraichissementSprites, this.nbSpritesEnnemisPieuvres);
                    this.p5.image(
                        this.images_ennemis_pieuvres[indexSpriteEnnemisPieuvres],
                        ennemi.getEnnemiCercle().getPosX() - ennemi.getEnnemiCercle().getRayon()/2,
                        ennemi.getEnnemiCercle().getPosY() - ennemi.getEnnemiCercle().getRayon()/2,
                        ennemi.getEnnemiCercle().getRayon(),
                        ennemi.getEnnemiCercle().getRayon()       
                    );
                    this.indexSpritesEnnemisPieuvres = this.indexSpritesEnnemisPieuvres + 1;
                    break;
            }
        });
    }

    calculerIndexSprite(indexSpriteActuel: number, frequenceRafraichissement: number, nbMax: number) {
        return Math.trunc( indexSpriteActuel / frequenceRafraichissement) % nbMax;
    }

    getListeCerclesEnnemis() {
        return this.listeEnnemis.map((ennemi: Ennemi) => {
            return ennemi.getEnnemiCercle();
        });
    }

    validerCaptureEnnemi(ennemi: Ennemi) {
        this.supprimerEnnemi(ennemi);       
        
        if (this.listeEnnemis.length === 0) {
            this.p5.serviceControleurPartie.gagnerPartie();
        }
    }

    gelerEnnemis(ms: number) {
        this.listeEnnemis.map((ennemi: Ennemi) => {
            return ennemi.gelerVelocite();
        });
        clearTimeout(this.timerGel);
        this.timerGel=setTimeout(() => {
            this.listeEnnemis.map((ennemi: Ennemi) => {
                ennemi.degelerVelocite();
            });
        }, ms);
    }

    supprimerEnnemi(ennemi: Ennemi) {
        this.listeEnnemis = this.listeEnnemis.filter( (ennemiActuel: Ennemi) => {
            const ennemiDifferent = ennemi !== ennemiActuel;
            if (!ennemiDifferent) {
                
                if (ennemiActuel.getContientBonusBouclier()) {
                    const point: Point = new Point(ennemiActuel.getEnnemiCercle().getPosX(), ennemiActuel.getEnnemiCercle().getPosY());
                    this.p5.serviceControleurPartie.getServiceBonus().faireApparaitreItemBouclier(point);
                }

                if (ennemiActuel.getContientBonusEnergie()) {
                    const point: Point = new Point(ennemiActuel.getEnnemiCercle().getPosX(), ennemiActuel.getEnnemiCercle().getPosY());
                    this.p5.serviceControleurPartie.getServiceBonus().faireApparaitreItemEnergie(point);
                }

                if (ennemiActuel.getContientBonusGel()) {
                    const point: Point = new Point(ennemiActuel.getEnnemiCercle().getPosX(), ennemiActuel.getEnnemiCercle().getPosY());
                    this.p5.serviceControleurPartie.getServiceBonus().faireApparaitreItemGel(point);
                }
            } 
            return ennemiDifferent;
        })
    }

    instancierImagesEnnemis() {
        const img_ennemi_bleu1 = this.p5.loadImage('assets/sprites/bleu1.png');
        const img_ennemi_bleu2 = this.p5.loadImage('assets/sprites/bleu2.png');
        const img_ennemi_bleu3 = this.p5.loadImage('assets/sprites/bleu3.png');

        const img_ennemi_limace1 = this.p5.loadImage('assets/sprites/limace1.png');
        const img_ennemi_limace2 = this.p5.loadImage('assets/sprites/limace2.png');
        const img_ennemi_limace3 = this.p5.loadImage('assets/sprites/limace3.png');
        const img_ennemi_limace4 = this.p5.loadImage('assets/sprites/limace3.png');

        const img_ennemi_pieuvre1 = this.p5.loadImage('assets/sprites/pieuvre1.png');
        const img_ennemi_pieuvre2 = this.p5.loadImage('assets/sprites/pieuvre2.png');
        const img_ennemi_pieuvre3 = this.p5.loadImage('assets/sprites/pieuvre3.png');
        const img_ennemi_pieuvre4 = this.p5.loadImage('assets/sprites/pieuvre3.png');

        this.images_ennemis_bleus.push(img_ennemi_bleu1);
        this.images_ennemis_bleus.push(img_ennemi_bleu2);
        this.images_ennemis_bleus.push(img_ennemi_bleu3);

        this.images_ennemis_limaces.push(img_ennemi_limace1);
        this.images_ennemis_limaces.push(img_ennemi_limace2);
        this.images_ennemis_limaces.push(img_ennemi_limace3);
        this.images_ennemis_limaces.push(img_ennemi_limace4);
        
        this.images_ennemis_pieuvres.push(img_ennemi_pieuvre1);
        this.images_ennemis_pieuvres.push(img_ennemi_pieuvre2);
        this.images_ennemis_pieuvres.push(img_ennemi_pieuvre3);
        this.images_ennemis_pieuvres.push(img_ennemi_pieuvre4);
    }
    
    public getListeEnnemis(): Ennemi[] {
        return this.listeEnnemis;
    }

    public setListeEnnemis(value: Ennemi[]) {
        this.listeEnnemis = value;
    }
}