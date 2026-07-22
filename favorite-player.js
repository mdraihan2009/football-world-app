const favoritePlayer = document.getElementById("favoritePlayer");

const player = JSON.parse(localStorage.getItem("favoritePlayer"));

if (player) {

    favoritePlayer.innerHTML = `
     <div class="match" onclick="openFavoritePlayer()">

            <img src="${player.photo}" width="90" style="border-radius:50%;">

            <h3>${player.name}</h3>

            <p>🌍 ${player.nationality}</p>

            <p>⚽ ${player.position}</p>

        </div>
    `;

} else {

    favoritePlayer.innerHTML = `
        <p style="text-align:center;">
            No Favorite Player Selected
        </p>
    `;

}
function openFavoritePlayer() {

    const player = JSON.parse(localStorage.getItem("favoritePlayer"));

    if (!player) return;

    localStorage.setItem("playerId", player.id);

    window.location.href = "player.html";

}