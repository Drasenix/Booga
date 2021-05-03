import { Line } from "../class/Line";
import { Multiplicateur } from "../class/Multiplicateur";
import { Point } from "../class/Point";
import { Score } from "../class/Score";


export class ServiceScore {
    
    private p5: any;

    private scoreGlobal: Score;    
    private positionScoreX: number = window.innerWidth / 2;
    private positionScoreY: number = window.innerHeight - 10;
    private sizeScoreGlobal: number = 32;
    private valeurScoreCollision: number = -100;
    private listeScoresAAfficher: Score[];
    private multiplicateursAAfficher: Multiplicateur | null;

    constructor(p5: any, score: number) {
        this.p5 = p5;
        this.scoreGlobal = new Score(score, this.positionScoreX, this.positionScoreY, this.sizeScoreGlobal);
        this.listeScoresAAfficher = [];
        this.multiplicateursAAfficher = null;
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

        this.drawCombo();
    }
    
    drawCombo() {

        if (this.multiplicateursAAfficher) {
            this.p5.textSize(this.multiplicateursAAfficher.getTaille());
            this.p5.fill(153, 153, 102);
            this.p5.text(this.multiplicateursAAfficher.getText(), this.multiplicateursAAfficher.getPoint().getPosX(), this.multiplicateursAAfficher.getPoint().getPosY());
            this.animerMultiplicateur(this.multiplicateursAAfficher);
        }
    }

    animerScore(score: Score) {
        const nouveauPoint = new Point(score.getPoint().getPosX(), score.getPoint().getPosY() - 1);

        score.setPoint(nouveauPoint);
        score.validerFrameAnimation();
        
        if (score.getNbFramesAnimation() === 0 ) {
            this.retirerScoreDeListeDesScoresAAfficher(score);
        }
    }

    animerMultiplicateur(multiplicateur: Multiplicateur) {
        const nouveauPoint = new Point(multiplicateur.getPoint().getPosX(), multiplicateur.getPoint().getPosY() - 1);

        multiplicateur.setPoint(nouveauPoint);
        multiplicateur.validerFrameAnimation();
        
        if (multiplicateur.getNbFramesAnimation() === 0 ) {
            this.supprimerCombo();
        }
    }

    perdreScoreCollision(posX: number, posY: number) {
        const sizeScoreCollision = 40;
        const scoreCollision = new Score(this.valeurScoreCollision, posX, posY, sizeScoreCollision);
        this.listeScoresAAfficher.push(scoreCollision);
        this.augmenterScoreGlobal(scoreCollision);

    }

    public retirerScoreDeListeDesScoresAAfficher(score: Score) {
        this.listeScoresAAfficher = this.listeScoresAAfficher.filter((scoreAAfficher: Score) => {
            return scoreAAfficher !== score;
        });
    }

    public supprimerCombo() {
        this.multiplicateursAAfficher = null;
    }

    public augmenterScoreGlobal(score: Score) {
        this.scoreGlobal.ajouterScore(score.getValeur());
    }

    public ajouterScoreToDraw(score: Score) {
        this.listeScoresAAfficher.push(score);
    }

    public ajouterMultiplicateurToDraw(multiplicateur: Multiplicateur) {
        this.multiplicateursAAfficher = multiplicateur;
    }

    public getScoreGlobal(): Score {
        return this.scoreGlobal;
    }
    public setScoreGlobal(value: Score) {
        this.scoreGlobal = value;
    }
}