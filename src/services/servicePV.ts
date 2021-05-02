
export class ServicePVs {

    private nbPVs: number;
    private p5: any;
    private img: any;
    private largeur_img: number;
    private hauteur_img: number;

    constructor(p5: any, nbPVs: number, largeur_img: number, hauteur_img: number) {
        this.p5 = p5;
        this.nbPVs = nbPVs;
        this.img = this.p5.loadImage('assets/img/life.png');
        this.hauteur_img = hauteur_img;
        this.largeur_img = largeur_img;
    }

    drawPVs() {
        for (let i =0; i < this.nbPVs; i++ ) {
            this.p5.image(this.img, window.innerWidth - (i + 1) * this.largeur_img , window.innerHeight - (window.innerHeight / 10), this.largeur_img, this.hauteur_img);
        }
    }

    public getNbPVs() {
        return this.nbPVs;
    }

    public setNbPVs(value: number) {
        this.nbPVs = value;
    }
}