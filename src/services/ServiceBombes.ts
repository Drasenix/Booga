
export class ServiceBombes {

    private nbBombes: number;    
    private p5: any;
    private img: any;
    private largeur_img: number;
    private hauteur_img: number;

    constructor(p5: any, nbBombes: number, largeur_img: number, hauteur_img: number) {
        this.p5 = p5;
        this.nbBombes = nbBombes;
        this.img = this.p5.loadImage('assets/img/nuke.png');
        this.hauteur_img = hauteur_img;
        this.largeur_img = largeur_img;
    }

    drawBombes() {
        for (let i =0; i < this.nbBombes; i++ ) {
            this.p5.image(this.img, (i) * this.largeur_img, window.innerHeight - this.hauteur_img, this.largeur_img, this.hauteur_img);
        }
    }

    public getNbBombes(): number {
        return this.nbBombes;
    }

    public setNbBombes(value: number) {
        this.nbBombes = value;
    }

}