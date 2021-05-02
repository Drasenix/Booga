
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

    public getPos_x(): number {
        return this.pos_x;
    }
    public setPos_x(value: number) {
        this.pos_x = value;
    }

    public getPos_y(): number {
        return this.pos_y;
    }
    public setPos_y(value: number) {
        this.pos_y = value;
    }

    public getSize(): number {
        return this.size;
    }
    public setSize(value: number) {
        this.size = value;
    }
}