// ===============================
// Football World - Team Details
// Part 1
// ===============================

const teamInfo = document.getElementById("teamInfo");
const playerList = document.getElementById("playerList");

const teamId = localStorage.getItem("favoriteTeamId");

if (!teamId) {

    teamInfo.innerHTML = `
    <div class="card" style="text-align:center;">
        <h2>⚽ No Favorite Team</h2>
        <p>Please select your favorite team first.</p>
    </div>
    `;

} else {

    loadTeamDetails();

}

async function loadTeamDetails() {

    teamInfo.innerHTML = `
    <div class="card" style="text-align:center;padding:25px;">
        <h3>⏳ Loading Team Details...</h3>
    </div>
    `;

    try {

        const response = await fetch(
            `https://v3.football.api-sports.io/teams?id=${teamId}`,
            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        if (response.status === 429) {

            teamInfo.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>⚠️ API Daily Limit Reached</h2>
                <p>Please try again tomorrow.</p>
            </div>
            `;

            return;

        }

        const data = await response.json();

        if (!data.response || data.response.length === 0) {

            teamInfo.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>❌ Team Not Found</h2>
            </div>
            `;

            return;

        }

        const team = data.response[0].team;
        const venue = data.response[0].venue;

        teamInfo.innerHTML = `
        <div class="match">

            <div style="text-align:center;">

                <img src="${team.logo}" width="100">

                <h2>${team.name}</h2>

                <p>🌍 ${team.country}</p>

                <p>🏟️ ${venue.name}</p>

                <p>📍 ${venue.city}</p>

                <p>📅 Founded : ${team.founded}</p>

            </div>

        </div>
        `;

        // Load Squad
        loadPlayers(team.id);
    } catch (error) {

        console.log(error);

        teamInfo.innerHTML = `
        <div class="card" style="text-align:center;">

            <h2>📡 Failed to Load Team</h2>

            <p>Please check your internet connection.</p>

        </div>
        `;

    }

}

// ===============================
// Load Squad
// ===============================

async function loadPlayers(teamId) {

    playerList.innerHTML = `
    <div class="card" style="text-align:center;">
        <p>⏳ Loading Players...</p>
    </div>
    `;

    try {

        const response = await fetch(
            `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        if (response.status === 429) {

            playerList.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>⚠️ API Daily Limit Reached</h2>
                <p>Please try again tomorrow.</p>
            </div>
            `;
            return;

        }

        const data = await response.json();

        if (!data.response || data.response.length === 0) {

            playerList.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>⚠️ Squad Not Available</h2>
            </div>
            `;
            return;

        }

        const players = data.response[0].players;

        playerList.innerHTML = "";

        players.forEach(player => {

            playerList.innerHTML += `

            <div class="match" onclick="openPlayer('${player.id}')">

                <img src="${player.photo}" width="60" style="border-radius:50%;">

                <h3>${player.name}</h3>

                <p>⚽ ${player.position}</p>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        playerList.innerHTML = `
        <div class="card" style="text-align:center;">

            <h2>📡 Failed to Load Players</h2>

            <p>Please check your internet connection.</p>

        </div>
        `;

    }

}

// ===============================
// Open Player
// ===============================

function openPlayer(playerId) {

    localStorage.setItem("playerId", playerId);

    window.location.href = "player.html";

}