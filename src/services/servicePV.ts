
export class ServicePVs {

    private nbPVs;
    private p5: any;

    constructor(p5: any, nbPVs: number) {
        this.nbPVs = nbPVs;
    }

    drawPVs() {
        
    }

    public getNbPVs() {
        return this.nbPVs;
    }

    public setNbPVs(value: number) {
        this.nbPVs = value;
    }
}