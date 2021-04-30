export class Point{
    private pos_x: number;    
    private pos_y: number;

    constructor(pos_x: number, pos_y: number) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
    }

    public getPosX(): number {
        return this.pos_x;
    }
    public setPosX(value: number) {
        this.pos_x = value;
    }

    public getPosY(): number {
        return this.pos_y;
    }
    public setPosY(value: number) {
        this.pos_y = value;
    }

}