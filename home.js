const homeLive = document.getElementById("homeLive");
const homeSchedule = document.getElementById("homeSchedule");

async function loadHome() {
  try {

    // Live Match
    const liveRes = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const liveData = await liveRes.json();

    if (liveData.response.length > 0) {

      const match = liveData.response[0];

      homeLive.innerHTML = `
      <div class="match">

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
      🔴 ${match.fixture.status.elapsed}'
      </div>

      </div>
      `;

    } else {

      homeLive.innerHTML = "<p>No Live Match</p>";

    }

    // Today's Matches
    const todayRes = await fetch(
      "https://v3.football.api-sports.io/fixtures?next=5",
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const todayData = await todayRes.json();

    homeSchedule.innerHTML = "";

    todayData.response.forEach(match => {

      homeSchedule.innerHTML += `
      <div class="match">
      ${match.teams.home.name}
      <b>VS</b>
      ${match.teams.away.name}
      </div>
      `;

    });

  } catch (e) {

    console.log(e);

  }
}

loadHome();
async function loadHomeNews() {

  const homeNews = document.getElementById("homeNews");

  try {

    const response = await fetch(
      "https://gnews.io/api/v4/search?q=football&lang=en&max=3&apikey=8fbf97457cf8e15563768fa237e8b663"
    );

    const data = await response.json();

    homeNews.innerHTML = "";

    data.articles.forEach(article => {

      homeNews.innerHTML += `
      <div class="match">

      <h3>${article.title}</h3>

      <p>${article.description || ""}</p>

      </div>
      `;

    });

  } catch (e) {

    homeNews.innerHTML =
    "<p>News Loading Failed</p>";

  }

}

loadHomeNews();
const favoriteTeam = document.getElementById("favoriteTeam");

function loadFavoriteTeam() {

const favoriteTeam = document.getElementById("favoriteTeam");

const teamName = localStorage.getItem("favoriteTeam");
const teamLogo = localStorage.getItem("favoriteTeamLogo");
const teamCountry = localStorage.getItem("favoriteCountry");

if (!teamName || !teamLogo) {

favoriteTeam.innerHTML = `
<div class="match">
<p style="text-align:center;">
No Favorite Team Selected
</p>
</div>
`;

return;

}

favoriteTeam.innerHTML = `

<div class="match" onclick="openTeamDetails()">

<div style="text-align:center;">

<img src="${teamLogo}" width="80" height="80">

<h2>${teamName}</h2>

<p>🌍 ${teamCountry}</p>

<p style="color:#22c55e;">
Tap to view Team Details
</p>

</div>

</div>

`;

}

function openTeamDetails(){

window.location.href="team.html";

}

loadFavoriteTeam();