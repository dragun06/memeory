class ChronoModele {
  static get CHRONO_MAX_VALEUR() {
    return 99 * 36000 + 59 * 600 + 599;
  }

  constructor() {
    this.temps = 0;
    // this.chronoValeurMax = 99*36000+59*600+599;

    this.ecouteurs = [];
  }

  ajouterEcouteur(ecouteur) {
    this.ecouteurs.push(ecouteur);
  }

  prevenirLesEcouteurs() {
    let i = 0;
    for (i = 0; i < this.ecouteurs.length; i++) {
      this.ecouteurs[i].update(
        this.getHeures(),
        this.getMinutes(),
        this.getSecondes()
      );
    }
  }

  incrementer() {
    this.temps += 1;
    if (this.temps > ChronoModele.CHRONO_MAX_VALEUR) this.temps = 0;
    this.prevenirLesEcouteurs();
  }

  getHeures() {
    let nbSecondes = Math.floor(this.temps / 10);
    let nbH = Math.floor(nbSecondes / 3600);

    return nbH;
  }

  getMinutes() {
    let nbSecondes = Math.floor(this.temps / 10);
    nbSecondes = nbSecondes - this.getHeures() * 3600;
    let nbM = Math.floor(nbSecondes / 60);

    return nbM;
  }

  getSecondes() {
    let nbSecondes = Math.floor(this.temps / 10);
    nbSecondes = nbSecondes - this.getHeures() * 3600 - this.getMinutes() * 60;
    return nbSecondes;
  }
}
