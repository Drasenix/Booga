import { Score } from "../class/Score";


export class ServiceScore {
    
    private p5: any;

    private scoreGlobal: Score;
    private positionScoreX: number = window.innerWidth / 2;
    private positionScoreY: number = window.innerHeight - 10;
    private sizeScore: number = 32;
    
    private listeScoresAAfficher: Score[];

    constructor(p5: any, score: number) {
        this.p5 = p5;
        this.scoreGlobal = new Score(score, this.positionScoreX, this.positionScoreY, this.sizeScore);
        this.listeScoresAAfficher = [];
    }

    public drawScorePartie() {
        this.p5.textSize(this.scoreGlobal.getSize());
        this.p5.fill(0, 102, 153);
        this.p5.text(this.scoreGlobal.getValeur(), this.scoreGlobal.getPos_x(), this.scoreGlobal.getPos_y());
    }

    public drawScores() {
        this.listeScoresAAfficher.forEach((score: Score) => {
            this.p5.textSize(score.getSize());
            this.p5.fill(0, 102, 153);
            this.p5.text(score.getValeur(), score.getPos_x(), score.getPos_y());
        });
    }

    public augmenterScoreGlobal(score: Score) {
        this.scoreGlobal.ajouterScore(score.getValeur());
    }

    public ajouterScoreToDraw(score: Score) {
        this.listeScoresAAfficher.push(score);
    }
}