class ChronoVue {
  constructor(position) {
    let top = '0em';
    if (position) {
      top = '' + 1.2 * position + 'em';
    }

    // la partie qui contient le chronometre
    this.texteChrono = document.createElement('div');

    // changement de style --> c'est dans le css
    // this.texteChrono.style.fontFamily = "Courier New, monospace";
    // ou texteChrono.style = "font-familly : Courier New, monospace"; // écrase d'autre modification de .style. précédocument
    // ou texteChrone.setAttribute("style", "font-family : Courier New, monospace");
    this.texteChrono.innerHTML = '00:00:00';

    // le contenant du chronoètre : texte + boutons
    this.aside = document.createElement('aside');
    this.aside.id = 'chrono';
    // this.aside.setAttribute("style", "position : absolute; right: 0; top: "+top+"; background: rgba(232,232,232,0.75);padding-right: 0.5rem;");
    this.aside.setAttribute('style', 'top: ' + top + ';');
    this.aside.appendChild(this.texteChrono);
    document.querySelector('.time').appendChild(this.aside);
  }

  /**
   *
   * @returns {HTMLElement}
   */
  getElementHtml() {
    return this.aside;
  }

  /**
   *
   * @param nbHeures un entier qui correspond au nombre d'heures
   * @param nbMinutes
   * @param nbSecondes
   */
  update(nbHeures, nbMinutes, nbSecondes) {
    let nbH = nbHeures;
    let nbM = nbMinutes;
    let nbS = nbSecondes;

    if (nbH < 10) nbH = '0' + nbH;
    if (nbM < 10) nbM = '0' + nbM;
    if (nbS < 10) nbS = '0' + nbS;

    this.texteChrono.innerHTML = nbM + ':' + nbS;
  }
}
