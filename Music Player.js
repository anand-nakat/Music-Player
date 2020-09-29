	
const docImage= document.getElementById("image");
const music= document.getElementById("music");
const play= document.getElementById("play");
const forward= document.getElementById("forward");
const backward= document.getElementById("backward");
const docTitle= document.querySelector('.title h1');
const docArtist= document.querySelector('.artist h2');
const playlist= document.querySelector('#playlist');


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

//Load 1st song 
docTitle.innerText= list_songs[0].title;
docArtist.innerText= list_songs[0].artist;
docImage.src=`images/${list_songs[0].image}.jpg`;
music.src=`music/${list_songs[0].title}.mp3`;


//create playlist
$(document).ready(function() {
	
list_songs.forEach((item,index) => {
	let song= document.createElement('div');
	song.innerHTML=item.title;
	song.classList.add("p-3","playlist-item");
	song.setAttribute("id", `item-${index}`);
	playlist.append(song);
	})
});

//Play song
function playMusic()
{
	if(player.playing === false)
		{
		player.playing=true;
		clearActiveList();
		let currentSong=document.getElementById(`item-${player.musicIndex}`);
		console.log(currentSong.innerHTML);
		currentSong.classList.add('active-song');
		music.play();
		docImage.classList.add('animate-image');
		document.querySelector('body').classList.add('animate-border');
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



const songList= document.getElementsByClassName('playlist-item');

$('.playlist').ready(function() {

$('.playlist-item').click(function(event) {
		
		clearActiveList();

		//Get music id eg item-n (n is index of music)
		let songID= $(this).attr('id');
		songID= songID.split("-");			//Split to get music index of current song
		songID=songID[1];
		player.musicIndex=songID;		

		// let playIcon= document.createElement('i');
		// playIcon.classList.add("fa" ,"fa-play");
		// $(this).append(playIcon);
		$(this).addClass('active-song');
	
		setMusicIndex(player.musicIndex);		//Set music index to current index
	
		player.playing=false;
		playMusic();
	});

});	


//Clear Active class of all Playlist items
function clearActiveList(){
	$('.playlist-item').each(function() {
		$(this).removeClass('active-song');
	});
}


//Next Song
function nextMusic()
{
	player.musicIndex+=1;
	if(player.musicIndex > list_songs.length -1)
	{
		player.musicIndex=0;
	}
	setMusicIndex(player.musicIndex);

	player.playing=false;
	playMusic();
}


//Adding Events on Click
music.addEventListener('ended',nextMusic);
play.addEventListener("click",playMusic);
forward.addEventListener("click",nextMusic);


//Previous Song
backward.addEventListener("click",() =>{
player.musicIndex-=1;

	if(player.musicIndex < 0)
	{
		player.musicIndex=list_songs.length-1;
	}

	setMusicIndex(player.musicIndex);

	player.playing=false;
	playMusic();

})

function setMusicIndex(index){
	docTitle.innerText= list_songs[index].title;
	docArtist.innerText= list_songs[index].artist;
	docImage.src=`images/${list_songs[index].image}.jpg`;
	music.src=`music/${list_songs[index].title}.mp3`;
}
