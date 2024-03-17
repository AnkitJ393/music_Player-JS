"use strict";

let songIndex=0;
let audioPlayer=new Audio('songs/1.mp3');
const masterPlay=document.querySelector('#masterPlay');
const myProgressBar=document.querySelector('#myProgressBar');
const gif=document.querySelector('#gif');
const songContainer=document.querySelector('.songItemContainer');
const songItemPlay=document.querySelector('.songItemPlay');
const nextSong=document.querySelector('#next');
const prevSong=document.querySelector('#previous');
const masterSongName= document.querySelector('#masterSongName');

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songs.forEach((e, i) => {
    const songdiv = `
        <div class="songItem">
            <img src="${e.coverPath}" alt="1">
            <span class="songName">${e.songName}</span>
            <span class="songlistplay">
                <span class="timestamp">05:34 
                    <i id="${i}" class="far songItemPlay fa-play-circle"></i>
                </span>
            </span>
        </div>`;
    songContainer.innerHTML += songdiv;
});



masterPlay.addEventListener('click',()=>{
    if(audioPlayer.paused || audioPlayer.currentTime <=0){
        audioPlayer.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioPlayer.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})



audioPlayer.addEventListener('timeupdate',()=>{
    let progress=parseInt((audioPlayer.currentTime/audioPlayer.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioPlayer.currentTime = myProgressBar.value * audioPlayer.duration/100;
})

function makeAllSongsPlay(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

songContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('songItemPlay')) {
        makeAllSongsPlay();
        songIndex  =parseInt(event.target.id);
        event.target.classList.remove('fa-play-circle');
        event.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity=1;
        audioPlayer.currentTime = 0;
        audioPlayer.src=`songs/${parseInt(songIndex)+1}.mp3`;
        audioPlayer.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
});

nextSong.addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioPlayer.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


prevSong.addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioPlayer.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})