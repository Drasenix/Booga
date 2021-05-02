import { Score } from "../class/Score";


export class ServiceScorePartie {
    
    private p5: any;

    private score: Score;
    private positionScoreX: number = window.innerWidth / 2;
    private positionScoreY: number = window.innerHeight - 10;
    private sizeScore: number = 32;

    constructor(p5: any, score: number) {
        this.p5 = p5;
        this.score = new Score(score, this.positionScoreX, this.positionScoreY, this.sizeScore);
    }

    drawScorePartie() {
        this.p5.textSize(32);
        this.p5.fill(0, 102, 153);
        this.p5.text(this.score.getValeur(), this.positionScoreX, this.positionScoreY);
    }

    public ajouterScore(score: number) {
        this.score .ajouterScore(score);
    }

}