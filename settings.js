const searchBtn = document.getElementById("searchBtn");
const teamSearch = document.getElementById("teamSearch");
const teamResult = document.getElementById("teamResult");

searchBtn.onclick = async () => {

const team = teamSearch.value.trim();

if (!team) return;

teamResult.innerHTML = "<p>Searching...</p>";

try {

const response = await fetch(
`https://v3.football.api-sports.io/teams?search=${encodeURIComponent(team)}`,
{
headers:{
"x-apisports-key":API_KEY
}
}
);

const data = await response.json();

if(data.response.length===0){

teamResult.innerHTML="<p>❌ Team not found</p>";
return;

}

const t=data.response[0].team;

selectedTeam = t;

teamResult.innerHTML=`

<div class="match">

<img src="${t.logo}" width="80">

<h3>${t.name}</h3>

<p>${t.country}</p>

<button onclick="saveFavorite('${t.name}')">

⭐ Set Favorite Team

</button>

</div>

`;

}catch(e){

console.log(e);
alert(e);

teamResult.innerHTML="<p>API Error</p>";

}

};

let selectedTeam = null;

function saveFavorite(){

if(!selectedTeam) return;

localStorage.setItem("favoriteTeam", selectedTeam.name);

localStorage.setItem("favoriteTeamId", selectedTeam.id);

localStorage.setItem("favoriteTeamLogo", selectedTeam.logo);

localStorage.setItem("favoriteCountry", selectedTeam.country);

alert(selectedTeam.name + " saved successfully!");

location.href = "index.html";

}
// ===============================
// Settings Functions
// ===============================

// Clear Cache
function clearAppCache() {

    localStorage.clear();

    alert("✅ Cache Cleared Successfully!");

}

// Share App
function shareApp() {

    if (navigator.share) {

        navigator.share({
            title: "Football World",
            text: "Check out Football World App!",
            url: window.location.href
        });

    } else {

        alert("Share is not supported on this device.");

    }

}

// Rate App
function rateApp() {

    alert("⭐ Play Store-এ প্রকাশের পর এখানে Rate App লিংক যোগ করা হবে।");

}
// ===============================
// Dark / Light Theme
// ===============================

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        localStorage.setItem("theme", "light");

    } else {

        localStorage.setItem("theme", "dark");

    }

}

// Theme Load

