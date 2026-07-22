// ===============================
// Football World - Search Team
// ===============================

const searchBtn = document.getElementById("searchBtn");
const teamSearch = document.getElementById("teamSearch");
const teamResult = document.getElementById("teamResult");

let selectedTeam = null;

searchBtn.onclick = async function () {

    const team = teamSearch.value.trim();

    if (team === "") {

        teamResult.innerHTML = `
        <div class="card" style="text-align:center;">
            <h3>⚠️ Please enter a team name</h3>
        </div>
        `;
        return;

    }

    teamResult.innerHTML = `
    <div class="card" style="text-align:center;">
        <p>🔍 Searching Team...</p>
    </div>
    `;

    try {

const result = await fetchApiFootball(
    `teams?search=${encodeURIComponent(team)}`
);

if(!result.success){

    if(result.error === "LIMIT"){

        teamResult.innerHTML = `
        <div class="card" style="text-align:center;">

            <h2>⚠️ Daily API Limit Reached</h2>

            <p>Please try again tomorrow.</p>

        </div>
        `;

    }else{

        teamResult.innerHTML = `
        <div class="card" style="text-align:center;">

            <h2>📡 No Internet</h2>

            <p>Please check your internet connection.</p>

        </div>
        `;

    }

    return;

}

const data = result.data;

if (!data.response || data.response.length === 0) {

    teamResult.innerHTML = `
    <div class="card" style="text-align:center;">

        <h2>❌ Team Not Found</h2>

        <p>Please check the spelling.</p>

    </div>
    `;

    return;

}

// ===============================
// API Daily Limit Check
// ===============================

if (data.errors && data.errors.requests) {

    teamResult.innerHTML = `
    <div class="card" style="text-align:center;">

        <h2>⚠️ Daily API Limit Reached</h2>

        <p>Please try again tomorrow.</p>

    </div>
    `;

    return;

}
        if (!data.response || data.response.length === 0) {

            teamResult.innerHTML = `
            <div class="card" style="text-align:center;">

            <h2>❌ Team Not Found</h2>

            <p>Please check the spelling.</p>

            </div>
            `;

            return;

        }

        const t = data.response[0].team;

        selectedTeam = t;

        teamResult.innerHTML = `

        <div class="match">

        <div style="text-align:center;">

        <img src="${t.logo}" width="90">

        <h2>${t.name}</h2>

        <p>🌍 ${t.country}</p>

        <br>

        <button onclick="saveFavoriteTeam()">

        ⭐ Set Favorite Team

        </button>

        </div>

        </div>

        `;

    } catch (error) {

        console.log(error);

        teamResult.innerHTML = `
        <div class="card" style="text-align:center;">

        <h2>📡 No Internet</h2>

        <p>Please check your internet connection.</p>

        </div>
        `;

    }

};

function saveFavoriteTeam() {

    if (!selectedTeam) return;

    localStorage.setItem("favoriteTeam", selectedTeam.name);
    localStorage.setItem("favoriteTeamId", selectedTeam.id);
    localStorage.setItem("favoriteTeamLogo", selectedTeam.logo);
    localStorage.setItem("favoriteCountry", selectedTeam.country);

    alert("✅ Favorite Team Saved!");

    location.reload();

}