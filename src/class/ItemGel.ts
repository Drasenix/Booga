import { Point } from "./Point";


export class ItemGel {

    private point: Point;
    

    constructor(point: Point) {
        this.point = point;
    }

    public getPoint(): Point {
        return this.point;
    }

    public setPoint(value: Point) {
        this.point = value;
    }
}