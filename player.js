// ===============================
// Football World Player Details
// Part 1
// ===============================

const playerInfo = document.getElementById("playerInfo");

const playerId = localStorage.getItem("playerId");

if (!playerId) {

    playerInfo.innerHTML = `
        <p style="text-align:center;">
            No Player Selected
        </p>
    `;

} else {

    loadPlayer(playerId);

}

async function loadPlayer(id) {

    showLoading(playerInfo, "Loading Player...");

    try {

        const response = await fetch(

            `https://v3.football.api-sports.io/players?id=${id}&season=2024`,

            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }

        );

        if (!response.ok) {
            throw new Error("API Error : " + response.status);
        }

        const data = await response.json();

        if (!data.response || data.response.length === 0) {

            playerInfo.innerHTML = `
                <p style="text-align:center;">
                    Player Not Found
                </p>
            `;

            return;
        }

        const player = data.response[0].player;
        const stats = data.response[0].statistics[0];

        const favoritePlayer = {

            id: player.id,
            name: player.name,
            photo: player.photo,
            nationality: player.nationality,
            position: stats.games.position ?? "N/A"

        };
        playerInfo.innerHTML = `

<div class="card">

<div style="text-align:center;">

<img src="${player.photo}" width="120"
style="border-radius:50%;">

<h2>${player.name}</h2>

<button id="favBtn" class="btn btn-primary">
⭐ Add to Favorite
</button>

<p>🌍 ${player.nationality}</p>

<p>🎂 Age: ${player.age}</p>

<p>📏 Height: ${player.height ?? "N/A"}</p>

<p>⚖️ Weight: ${player.weight ?? "N/A"}</p>

<hr>

<p>🏟️ Club: ${stats.team.name}</p>

<p>🏆 League: ${stats.league.name}</p>

<hr>

<div class="stats-grid">

<div class="stat-box">
👕<br><b>Jersey</b><br>${stats.games.number ?? "N/A"}
</div>

<div class="stat-box">
⚽<br><b>Position</b><br>${stats.games.position ?? "N/A"}
</div>

<div class="stat-box">
⏱<br><b>Minutes</b><br>${stats.games.minutes ?? 0}
</div>

<div class="stat-box">
📋<br><b>Lineups</b><br>${stats.games.lineups ?? 0}
</div>

<div class="stat-box">
⚽<br><b>Matches</b><br>${stats.games.appearances ?? 0}
</div>

<div class="stat-box">
🥅<br><b>Goals</b><br>${stats.goals.total ?? 0}
</div>

<div class="stat-box">
🎯<br><b>Assists</b><br>${stats.goals.assists ?? 0}
</div>

<div class="stat-box">
⭐<br><b>Rating</b><br>${stats.games.rating || "N/A"}
</div>

<div class="stat-box">
👑<br><b>Captain</b><br>${stats.games.captain ? "Yes" : "No"}
</div>

<div class="stat-box">
🟨<br><b>Yellow</b><br>${stats.cards.yellow ?? 0}
</div>

<div class="stat-box">
🟥<br><b>Red</b><br>${stats.cards.red ?? 0}
</div>

</div>

</div>

`;
// Favorite Button

document.getElementById("favBtn").addEventListener("click", () => {

    localStorage.setItem(
        "favoritePlayer",
        JSON.stringify(favoritePlayer)
    );

    alert("⭐ Favorite Player Saved Successfully!");

});

// End try
} catch (error) {

    console.log(error);

    playerInfo.innerHTML = `
        <p style="text-align:center;color:red;">
            Failed to load player.
        </p>
    `;

}
}