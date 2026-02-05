import { Howl } from "howler";

export class ServiceMusique {
  private musiqueThemePrincipal: Howl;
  private musiqueEnCours: boolean;
  constructor() {
    this.musiqueThemePrincipal = new Howl({
      src: ["assets/sound/boogaloopersMainTrack.wav"],
      loop: true,
    });
    this.musiqueEnCours = false;
  }

  lancerMusique() {
    this.musiqueThemePrincipal.play();
    this.musiqueEnCours = true;
  }

  stoperMusique() {
    this.musiqueThemePrincipal.stop();
    this.musiqueEnCours = false;
  }

  isMusiqueEnCours(): boolean {
    return this.musiqueEnCours;
  }
}
