
const songs = [
  {
    title: "Sad Gaana",
    artist: "Bali, AN1K8T",
    src: "song1.mp3",
    album: "album1.jpg",
    lyrics: [
      "Ye goat kya hai meri bakar dekh",
      "Kal se ...",
      "Last time mai roya ...",
      "Sad gaane gaaunga ...",
      "Santra nahi ..."
    ]
  }
];

const audio = new Audio();
let index = 0;

const playlist = document.getElementById("playlist");
const lyricsBox = document.getElementById("lyrics");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const footerSong = document.getElementById("footerSong");
const footerArtist = document.getElementById("footerArtist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");
const volume = document.getElementById("volume");

function loadSong(i) {
  index = i;
  const s = songs[i];

  audio.src = s.src;
  albumArt.src = s.album;
  songTitle.textContent = s.title;
  songArtist.textContent = s.artist;
  footerSong.textContent = s.title;
  footerArtist.textContent = s.artist;

  lyricsBox.innerHTML = s.lyrics
    .map((line, idx) => `<p id='l${idx}'>${line}</p>`)
    .join("");

  highlightPlaylist();
}

function highlightPlaylist() {
  [...playlist.children].forEach((li, i) => {
    li.classList.toggle("active-track", i === index);
  });
}

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
};

nextBtn.onclick = () => {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸️";
};

prevBtn.onclick = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸️";
};

audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeText.textContent = formatTime(audio.currentTime);
  durationText.textContent = formatTime(audio.duration);
};

progress.oninput = () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
};

volume.oninput = () => (audio.volume = volume.value);

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

songs.forEach((s, i) => {
  const li = document.createElement("li");
  li.textContent = s.title + " - " + s.artist;
  li.onclick = () => {
    loadSong(i);
    audio.play();
    playBtn.textContent = "⏸️";
  };
  playlist.appendChild(li);
});

loadSong(0);