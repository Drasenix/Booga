
export class Niveau {

    private numeroNiveau: number;    
    private nbEnnemis: number;
    

    constructor(numeroNiveau: number) {
        this.numeroNiveau = numeroNiveau;
        this.nbEnnemis = numeroNiveau * 2;

    }

    public getNumeroNiveau(): number {
        return this.numeroNiveau;
    }
    public setNumeroNiveau(value: number) {
        this.numeroNiveau = value;
    }
    public getNbEnnemis(): number {
        return this.nbEnnemis;
    }
    public setNbEnnemis(value: number) {
        this.nbEnnemis = value;
    }
}