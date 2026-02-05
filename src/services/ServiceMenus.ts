
export class ServiceMenus {

    private p5: any;
    private tailleTexteGameOver: number;
        

    constructor(p5: any) {
        this.p5 = p5;        
        this.tailleTexteGameOver = 100;
    }

    drawCommencerPartie() {
        this.p5.background(0, 1000);

        this.p5.textSize(100);
        this.p5.fill(255, 255, 255);
        this.p5.text(
            'Click to begin !',
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2
        );        
    }

    drawPartiePerdue() {
        this.p5.background(0, 1000);

        this.p5.textSize(100);
        this.p5.fill(255, 255, 255);
        this.p5.text(
            'Game Over !',
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2
        );
        this.p5.text(
            'Score : ' + this.p5.serviceControleurPartie.getServiceScore().getScoreGlobal().getValeur(),
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2 + this.tailleTexteGameOver
        );
        this.p5.text(
            'Niveau : ' + this.p5.serviceControleurPartie.getServiceNiveau().getNiveauActuel().getNumeroNiveau(),
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2 +  2 * this.tailleTexteGameOver
        );
    } 
    
    drawPartieGagnee() {
        this.p5.background(0, 1000);

        this.p5.textSize(100);
        this.p5.fill(255, 255, 255);
        this.p5.text(
            'Bien joué !',
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2
        );
        this.p5.text(
            'Score : ' + this.p5.serviceControleurPartie.getServiceScore().getScoreGlobal().getValeur(),
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2 + this.tailleTexteGameOver
        );
        this.p5.text(
            'Niveau : ' + this.p5.serviceControleurPartie.getServiceNiveau().getNiveauActuel().getNumeroNiveau(),
            window.innerWidth / 2 - 3 * this.tailleTexteGameOver,
            window.innerHeight / 2 +  2 * this.tailleTexteGameOver
        );
    }

}