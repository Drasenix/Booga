

export class ServiceScore {
    
    private p5: any;

    private score: number;
    
    constructor(p5: any, score: number) {
        this.p5 = p5;
        this.score = score;
    }

    drawScore() {
        this.p5.textSize(32);
        this.p5.fill(0, 102, 153);
        this.p5.text(this.score.toString(), window.innerWidth / 2, window.innerHeight - 10);
    }

    public ajouterScore(score: number) {
        this.score += score;
    }

    public getScore(): number {
        return this.score;
    }
    public setScore(value: number) {
        this.score = value;
    }

}