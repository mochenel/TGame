const playButton = document.getElementById('play-btn');
playButton.addEventListener('click',redirect);
function redirect() {
	window.location.href = "game.html";
}