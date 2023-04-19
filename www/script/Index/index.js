let played = false;
const audio = new Audio('./media/Sounds/ding dong.mp3');
document.addEventListener('click', () => {
  if (!played) {
    anime
      .timeline({ loop: false })
      .add({
        targets: '.ml15 .word',
        scale: [14, 1],
        opacity: [0, 1],
        easing: 'easeOutCirc',
        duration: 800,
        delay: (el, i) => 1000 * i,
      })
      .add({
        targets: '.ml15',
        opacity: 0,
        duration: Infinity,
        easing: 'easeOutExpo',
        delay: 1000,
      });
    audio.load();
    audio.play();
    played = true;

    setTimeout(() => {
      document.location.assign('./html/config.html');
    }, 3000);
    goToConfig();
  }
});
