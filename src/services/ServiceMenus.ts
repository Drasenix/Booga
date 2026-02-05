export class ServiceMenus {
  private p5: any;
  private tailleTexte: number;

  constructor(p5: any) {
    this.p5 = p5;
    this.tailleTexte = 100;
  }

  drawCommencerPartie() {
    this.p5.background(0, 1000);

    this.p5.textSize(100);
    this.p5.fill(255, 255, 255);
    this.p5.text(
      "Cliquez pour commencer !",
      window.innerWidth / 2 - this.tailleTexte * 6,
      window.innerHeight / 2,
    );
  }

  drawPartiePerdue() {
    this.p5.background(0, 1000);

    this.p5.textSize(100);
    this.p5.fill(255, 255, 255);
    this.p5.text(
      "Game Over !",
      window.innerWidth / 2 - 3 * this.tailleTexte,
      window.innerHeight / 2,
    );
    this.p5.text(
      "Score : " +
        this.p5.serviceControleurPartie
          .getServiceScore()
          .getScoreGlobal()
          .getValeur(),
      window.innerWidth / 2 - 3 * this.tailleTexte,
      window.innerHeight / 2 + this.tailleTexte,
    );
    this.p5.text(
      "Niveau : " +
        this.p5.serviceControleurPartie
          .getServiceNiveau()
          .getNiveauActuel()
          .getNumeroNiveau(),
      window.innerWidth / 2 - 3 * this.tailleTexte,
      window.innerHeight / 2 + 2 * this.tailleTexte,
    );
  }

  drawPartieGagnee() {
    this.p5.background(0, 1000);

    this.p5.textSize(100);
    this.p5.fill(255, 255, 255);
    this.p5.text(
      "Bien joué !",
      window.innerWidth / 2 - 3 * this.tailleTexte,
      window.innerHeight / 2,
    );
    this.p5.text(
      "Score : " +
        this.p5.serviceControleurPartie
          .getServiceScore()
          .getScoreGlobal()
          .getValeur(),
      window.innerWidth / 2 - 3 * this.tailleTexte,
      window.innerHeight / 2 + this.tailleTexte,
    );
    this.p5.text(
      "Niveau : " +
        this.p5.serviceControleurPartie
          .getServiceNiveau()
          .getNiveauActuel()
          .getNumeroNiveau(),
      window.innerWidth / 2 - 3 * this.tailleTexte,
      window.innerHeight / 2 + 2 * this.tailleTexte,
    );
  }
}
