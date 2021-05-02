import { Line } from "../class/Line";
import { Point } from "../class/Point";
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
        this.p5.text(this.scoreGlobal.getValeur(), this.scoreGlobal.getPoint().getPosX(), this.scoreGlobal.getPoint().getPosY());
    }

    public drawScores() {
        this.listeScoresAAfficher.forEach((score: Score) => {
            this.p5.textSize(score.getSize());
            this.p5.fill(0, 153, 102);
            this.p5.text(score.getValeur(), score.getPoint().getPosX(), score.getPoint().getPosY());
            this.animerScore(score);
        });
    }

    async animerScore(score: Score) {
        const nouveauPoint = new Point(score.getPoint().getPosX(), score.getPoint().getPosY() - 1);

        score.setPoint(nouveauPoint);
        score.validerFrameAnimation();
        
        if (score.getNbFramesAnimation() === 0 ) {
            this.retirerScoreDeListeDesScoresAAfficher(score);
        }
    }

    public retirerScoreDeListeDesScoresAAfficher(score: Score) {
        this.listeScoresAAfficher = this.listeScoresAAfficher.filter((scoreAAfficher: Score) => {
            return scoreAAfficher !== score;
        });
    }

    public augmenterScoreGlobal(score: Score) {
        this.scoreGlobal.ajouterScore(score.getValeur());
    }

    public ajouterScoreToDraw(score: Score) {
        this.listeScoresAAfficher.push(score);
    }
}