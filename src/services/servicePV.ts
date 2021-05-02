
export class ServicePVs {

    private nbPVs;
    private p5: any;
    private img: any;

    constructor(p5: any, nbPVs: number) {
        this.p5 = p5;
        this.nbPVs = nbPVs;
        this.img = this.p5.loadImage('assets/img/life.png');;
    }

    drawPVs() {
        for (let i =0; i < this.nbPVs; i++ ) {
            this.p5.image(this.img, window.innerWidth - (i + 1) * (window.innerWidth / 20) , window.innerHeight - (window.innerHeight / 10), window.innerWidth / 25, window.innerHeight / 10);
        }
    }

    public getNbPVs() {
        return this.nbPVs;
    }

    public setNbPVs(value: number) {
        this.nbPVs = value;
    }
}