const liveContainer = document.getElementById("liveMatches");

async function loadLiveMatches() {

  liveContainer.innerHTML = "<p style='text-align:center'>Loading...</p>";

  try {

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const data = await response.json();

    if (!data.response || data.response.length === 0) {
      liveContainer.innerHTML =
      "<h3 style='text-align:center;color:#facc15;'>No Live Match Now</h3>";
      return;
    }

    liveContainer.innerHTML = "";

    data.response.forEach(match => {

      liveContainer.innerHTML += `

<div class="match" onclick="openMatch('${match.fixture.id}')">

        <div class="live">🔴 LIVE</div>
<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:15px;">

<img src="${match.league.logo}"
style="width:35px;height:35px;">

<span style="font-weight:bold;color:#facc15;">
${match.league.name}
</span>

</div>

<div class="team">

<div class="club">
<img src="${match.teams.home.logo}">
<span>${match.teams.home.name}</span>
</div>

<div class="vs">VS</div>

<div class="club">
<img src="${match.teams.away.logo}">
<span>${match.teams.away.name}</span>
</div>

</div>

<div class="score">
${match.goals.home} - ${match.goals.away}
</div>


        <div class="time">
          ⏱️ ${match.fixture.status.elapsed}'
        </div>
<div style="
margin-top:12px;
text-align:center;
color:#cbd5e1;
font-size:14px;
">

🏟️ ${match.fixture.venue.name}

</div>

<div style="
text-align:center;
color:#94a3b8;
font-size:13px;
margin-top:5px;
">

🌍 ${match.league.country}

</div>
      </div>

      `;

    });

  } catch (error) {

    liveContainer.innerHTML =
    "<h3 style='text-align:center;color:red;'>API Error</h3>";

    console.log(error);

  }

}

loadLiveMatches();

function openMatch(matchId){

localStorage.setItem("matchId", matchId);

location.href = "match.html";

}