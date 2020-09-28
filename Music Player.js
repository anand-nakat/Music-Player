	
const docImage= document.getElementById("image");
const music= document.getElementById("music");
const play= document.getElementById("play");
const forward= document.getElementById("forward");
const backward= document.getElementById("backward");
const docTitle= document.querySelector('.title h1');
const docArtist= document.querySelector('.artist h2');

player={ playing:false,musicIndex:0};
let list_songs=[
{
	title:"Perfect 10",
	artist: "NCS- Unknown Brain",
	image:"image 1"
	},
	{
	title:"Say Goodbye",
	artist: "NCS- Unknown Brain",
	image:"image 2"
	},
	{
	title:"In The End- Remix",
	artist: "Linkin Park",
	image:"image 3"
	},
	{
	title:"Nova NCS Release",
	artist: "Ahrix",
	image:"image 4"
	},
	{
	title:"Dreams",
	artist: "NCS- Lost Sky",
	image:"image 5"
	}
];

docTitle.innerText= list_songs[0].title;
docArtist.innerText= list_songs[0].artist;
docImage.src=`images/${list_songs[0].image}.jpg`;
music.src=`music/${list_songs[0].title}.mp3`;


function playMusic()
{
	if(player.playing === false)
		{
		player.playing=true;
		music.play();
		docImage.classList.add('animate-image');
		document.querySelector('.parent-container').classList.add('animate-border');
		play.classList.replace('fa-play-circle','fa-pause-circle');
		}

	else {
		player.playing=false;
		music.pause();
		document.querySelector('.parent-container').classList.remove('animate-border');
		docImage.classList.remove('animate-image');
		play.classList.replace('fa-pause-circle','fa-play-circle');
		}
}

function nextMusic()
{
	player.musicIndex+=1;
	if(player.musicIndex > list_songs.length)
	{
		player.musicIndex=0;
	}
	docTitle.innerText= list_songs[player.musicIndex].title;
	docArtist.innerText= list_songs[player.musicIndex].artist;
	docImage.src=`images/${list_songs[player.musicIndex].image}.jpg`;
	music.src=`music/${list_songs[player.musicIndex].title}.mp3`;
	player.playing=false;
	playMusic();
}

music.addEventListener('ended',nextMusic);
play.addEventListener("click",playMusic);
forward.addEventListener("click",nextMusic);


backward.addEventListener("click",() =>{
player.musicIndex-=1;

	if(player.musicIndex < 0)
	{
		player.musicIndex=list_songs.length-1;
	}

	docTitle.innerText= list_songs[player.musicIndex].title;
	docArtist.innerText= list_songs[player.musicIndex].artist;
	docImage.src=`images/${list_songs[player.musicIndex].image}.jpg`;
	music.src=`music/${list_songs[player.musicIndex].title}.mp3`;
	player.playing=false;
playMusic();

})
