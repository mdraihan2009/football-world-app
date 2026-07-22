// ===============================
// Football World - Match Details
// Part 1
// ===============================

const matchDetails = document.getElementById("matchDetails");

const matchId = localStorage.getItem("matchId");

if (!matchId) {

    matchDetails.innerHTML = `
    <div class="card" style="text-align:center;">
        <h2>❌ No Match Selected</h2>
    </div>
    `;

} else {

    loadMatch(matchId);

}

async function loadMatch(id) {

    matchDetails.innerHTML = `
    <div class="card" style="text-align:center;padding:25px;">
        <h3>⏳ Loading Match Details...</h3>
    </div>
    `;

    try {

        const response = await fetch(
            `https://v3.football.api-sports.io/fixtures?id=${id}`,
            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        if (response.status === 429) {

            matchDetails.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>⚠️ API Daily Limit Reached</h2>
                <p>Please try again tomorrow.</p>
            </div>
            `;

            return;

        }

        const data = await response.json();

        if (!data.response || data.response.length === 0) {

            matchDetails.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>❌ Match Not Found</h2>
            </div>
            `;

            return;

        }

        const match = data.response[0];

        const home = match.teams.home;
        const away = match.teams.away;

        const goals = match.goals;
        const league = match.league;
        const fixture = match.fixture;

        matchDetails.innerHTML = `

<div class="card">

<h2 style="text-align:center;">
${league.name}
</h2>

<p style="text-align:center;">
🌍 ${league.country}
</p>

<hr>

<div style="display:flex;justify-content:space-around;align-items:center;text-align:center;">

<div>

<img src="${home.logo}" width="70">

<h3>${home.name}</h3>

</div>

<div>

<h1>${goals.home} - ${goals.away}</h1>

<p>⏱️ ${fixture.status.elapsed ?? 0}'</p>

</div>

<div>

<img src="${away.logo}" width="70">

<h3>${away.name}</h3>

</div>

</div>

<hr>

<p>🏟️ ${fixture.venue.name}</p>

<p>📍 ${fixture.venue.city}</p>
<hr>

<p>📅 ${fixture.date.split("T")[0]}</p>

<p>👨‍⚖️ Referee : ${fixture.referee ?? "N/A"}</p>

</div>
`;

    } catch (error) {

        console.log(error);

        matchDetails.innerHTML = `

        <div class="card" style="text-align:center;">

            <h2>📡 Failed to Load Match</h2>

            <p>Please check your internet connection.</p>

        </div>

        `;

    }

}