// ===============================
// Football World - League Standings
// ===============================

const standingsResult = document.getElementById("standingsResult");
const leagueSelect = document.getElementById("leagueSelect");
const loadStandingsBtn = document.getElementById("loadStandings");

loadStandingsBtn.addEventListener("click", loadStandings);

async function loadStandings() {

    const league = leagueSelect.value;

    standingsResult.innerHTML = `
    <div class="card" style="text-align:center;">
        <h3>⏳ Loading Standings...</h3>
    </div>
    `;

    try {

        const response = await fetch(
            `https://v3.football.api-sports.io/standings?league=${league}&season=2024`,
            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        const data = await response.json();

        if (!data.response || data.response.length === 0) {

            standingsResult.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>❌ Standings Not Available</h2>
            </div>
            `;

            return;
        }

        const table = data.response[0].league.standings[0];

        standingsResult.innerHTML = "";

        table.forEach(team => {

            standingsResult.innerHTML += `

            <div class="match"
style="
border-left:6px solid ${
team.rank <= 4
? '#22c55e'
: team.rank >= 18
? '#ef4444'
: '#334155'
};
">

                <div style="display:flex;align-items:center;gap:10px;">
 <div style="
width:28px;
height:28px;
border-radius:50%;
background:${
team.rank <= 4
? '#22c55e'
: team.rank >= 18
? '#ef4444'
: '#475569'
};
display:flex;
align-items:center;
justify-content:center;
font-weight:bold;
color:white;
">
${team.rank}
</div>

                    <img src="${team.team.logo}" width="35">

 <span style="
font-size:16px;
font-weight:bold;
color:white;
">
${team.team.name}
</span>

                </div>

<div style="margin-top:8px;font-size:14px;line-height:1.8;">

<span style="
background:#22c55e;
color:white;
padding:4px 10px;
border-radius:20px;
font-weight:bold;
">
🏆 ${team.points} PTS
</span>
&nbsp;&nbsp;
⚽ <b>MP:</b> ${team.all.played}

<br>

✅ <b>W:</b> ${team.all.win}
&nbsp;&nbsp;
🤝 <b>D:</b> ${team.all.draw}
&nbsp;&nbsp;
❌ <b>L:</b> ${team.all.lose}

<br>

🥅 <b>GF:</b> ${team.all.goals.for}
&nbsp;&nbsp;
🚫 <b>GA:</b> ${team.all.goals.against}
&nbsp;&nbsp;
📈 <b>GD:</b> ${team.goalsDiff}

</div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        standingsResult.innerHTML = `
        <div class="card" style="text-align:center;">
            <h2>📡 Failed to Load Standings</h2>
            <p>Check your internet connection.</p>
        </div>
        `;

    }

}