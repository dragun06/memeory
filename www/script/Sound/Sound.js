class Sound {
  music;
  discord;
  applause;
  forfeit;
  duel;
  atoi;
  soundOn;
  soundFiles;
  isPlaying;

  constructor(_soundFiles) {
    this.soundFiles = _soundFiles;
    this.music = new Audio('../media/Sounds/' + _soundFiles[0]);
    this.discord = new Audio('../media/Sounds/' + _soundFiles[1]);
    this.applause = new Audio('../media/Sounds/' + _soundFiles[2]);
    this.forfeit = new Audio('../media/Sounds/' + _soundFiles[3]);
    this.duel = new Audio('../media/Sounds/' + _soundFiles[4]);
    this.atoi = new Audio('../media/Sounds/' + _soundFiles[5]);
    this.nope = new Audio('../media/Sounds/' + _soundFiles[6]);
    this.waw = new Audio('../media/Sounds/' + _soundFiles[7]);
    this.fanfare = new Audio('../media/Sounds/' + _soundFiles[8]);
    this.music.play();
    this.isPlaying = true;
    this.music.loop = true;
    this.soundOn = true;
    console.log(this.music);
    this.initVolume();
  }

  initVolume() {
    this.music.volume = 0.2;
    this.discord.volume = 0.3;
    this.atoi.volume = 0.5;
    this.applause.volume = 0.4;
    this.forfeit.volume = 0.4;
    this.fanfare.volume = 0.5;
  }

  soundOnOff() {
    this.soundOn = !this.soundOn;
  }

  playPauseMusic() {
    console.log(this.isPlaying);
    if (this.isPlaying === true) {
      this.music.pause();
    } else {
      this.music.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  playDiscord() {
    if (this.soundOn) {
      this.discord.load();
      this.discord.play();
    }
  }

  playApplause() {
    if (this.soundOn) this.applause.play();
  }

  playForfeit() {
    this.forfeit.play();
  }

  playDuel() {
    this.duel.play();
  }

  playAToi() {
    if (this.soundOn) {
      this.atoi.load();
      this.atoi.play();
    }
  }

  playWaw() {
    if (this.soundOn) {
      this.waw.load();
      this.waw.play();
    }
  }

  playNope() {
    if (this.soundOn) {
      this.nope.load();
      this.nope.play();
    }
  }

  playFanfare() {
    if (this.soundOn) {
      this.fanfare.load();
      this.fanfare.play();
    }
  }
}
