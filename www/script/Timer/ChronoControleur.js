class ChronoControleur {
  /**
   *
   * @param abstraction
   * @param presentation
   */
  constructor(modele, vue) {
    this.modele = modele;
    this.vue = vue;

    this.interval = -1;

    //document.addEventListener('mouseenter', () => this.lancer());
  }

  stopOuRelancer() {
    if (this.interval >= 0) {
      clearInterval(this.interval);
      this.interval = -1;
    } else {
      this.interval = setInterval(() => this.incrementerChrono(), 100);
    }
  }

  lancer() {
    if (this.interval === -1) {
      this.interval = setInterval(() => this.incrementerChrono(), 100);
    }
  }

  incrementerChrono() {
    this.modele.incrementer();
  }
}

// point d'entrée
document.addEventListener('DOMContentLoaded', () => {
  let M = new ChronoModele();
  let V = new ChronoVue(2);
  M.ajouterEcouteur(V);

  let C = new ChronoControleur(M, V);
  C.lancer();
});
