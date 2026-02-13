import { Niveau } from "../class/Niveau";

export class ServiceNiveau {
  private p5: any;
  private niveauActuel: Niveau;

  constructor(p5: any) {
    this.p5 = p5;
    this.niveauActuel = new Niveau(3);
  }

  instancierNumeroNiveau(numero: number) {
    this.niveauActuel = new Niveau(numero);
  }

  public getNiveauActuel(): Niveau {
    return this.niveauActuel;
  }
  public setNiveauActuel(value: Niveau) {
    this.niveauActuel = value;
  }
}
