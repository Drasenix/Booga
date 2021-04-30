import { Point } from "./Point";

export class Line {
    private point_a: Point;
    
    private point_b: Point;

    constructor(point_a: Point, point_b: Point) {
        this.point_a = point_a;
        this.point_b = point_b;
    }

    public getPointA(): Point {
        return this.point_a;
    }
    public setPointA(value: Point) {
        this.point_a = value;
    }

    public getPointB(): Point {
        return this.point_b;
    }
    public setPointB(value: Point) {
        this.point_b = value;
    }
}