function startoverlay() {
    document.getElementById("overlay1").style.display = "block";
}

function endoverlay() {
    document.getElementById("overlay1").style.display = "none";
    var mySound = document.getElementById("bg");
    mySound.play();
}