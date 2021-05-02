
export class Score {

    private valeur: number;
    
    private pos_x: number;
    private pos_y: number;
    private size: number;

    constructor(
        valeur: number,
        pos_x: number,
        pos_y: number,
        size: number
    ) {
        this.valeur = valeur;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.size = size;
    }

    ajouterScore(score: number) {
        this.valeur += score;
    }

    public getValeur(): number {
        return this.valeur;
    }
    public setValeur(value: number) {
        this.valeur = value;
    }
}