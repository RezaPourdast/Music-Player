import { songs } from "./music/songs.js";

let progress = document.getElementById("progress");
let goBackward = document.getElementById("backward");
let ctrlIcon = document.getElementById("ctrlIcon");
let play_pause = document.getElementById("play-pause");
let volumeRange = document.getElementById("volumeRange");
let songName = document.getElementById("song-name");
let songAuthor = document.getElementById("song-author");
let imageHtml = document.querySelector(".song-img");
let nextSong = document.querySelector(".next");
let currentSong = document.querySelector(".currentSong");
let currentSongNumber = 0;
let song = document.getElementById(`song-${currentSongNumber}`);

function loadMusic() {
  imageHtml.src = songs[currentSongNumber].icon;
  currentSong.innerHTML = `<audio id="song-${currentSongNumber}">
<source src="${songs[currentSongNumber].media}" type="audio/mpeg" />
</audio>`;
  songName.innerHTML = songs[currentSongNumber].name;
  songAuthor.innerHTML = songs[currentSongNumber].author;

  song = document.getElementById(`song-${currentSongNumber}`);

  song.volume = 0.1;

  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
  };

  if (song.play) {
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }

  progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    play_pause.classList.add("fa-pause");
    play_pause.classList.remove("fa-play");
  };

  volumeRange.onchange = function () {
    song.volume = Number(volumeRange.value) / 100;
  };
}
loadMusic();

nextSong.addEventListener("click", () => {
  currentSongNumber += 1;
  if (!songs[currentSongNumber]) {
    currentSongNumber = 0;
  }
  loadMusic();
  song.play();
  if (play_pause.classList.contains("fa-play")) {
    play_pause.classList.remove("fa-play");
    play_pause.classList.add("fa-pause");
  }
  volumeRange.value = song.volume * 100;
});

goBackward.addEventListener("click", () => {
  currentSongNumber = currentSongNumber - 1;

  if (!songs[currentSongNumber]) {
    currentSongNumber = 0;
  }
  loadMusic();
  song.play();
  if (play_pause.classList.contains("fa-play")) {
    play_pause.classList.remove("fa-play");
    play_pause.classList.add("fa-pause");
  }
  volumeRange.value = song.volume * 100;
});

function playPause() {
  if (play_pause.classList.contains("fa-pause")) {
    song.pause();
    play_pause.classList.remove("fa-pause");
    play_pause.classList.add("fa-play");
  } else {
    song.play();
    play_pause.classList.add("fa-pause");
    play_pause.classList.remove("fa-play");
  }
}

ctrlIcon.addEventListener("click", () => {
  playPause();
});
