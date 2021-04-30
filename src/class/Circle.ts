
export class Circle {
    private posX: number;    
    private posY: number;
    private rayon: number;
    

    constructor(posX: number, posY: number, rayon: number) {
        this.posX = posX;
        this.posY = posY;
        this.rayon = rayon;
    }

    public getPosX(): number {
        return this.posX;
    }
    public setPosX(value: number) {
        this.posX = value;
    }

    public getPosY(): number {
        return this.posY;
    }
    public setPosY(value: number) {
        this.posY = value;
    }
    
    public getRayon(): number {
        return this.rayon;
    }
    public setRayon(value: number) {
        this.rayon = value;
    }
}