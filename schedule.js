// ===============================
// Football World Schedule
// ===============================

const scheduleContainer = document.getElementById("scheduleMatches");

// Top Leagues
const leagues = [
    39,   // Premier League
];

// আগামী ৭ দিনের তারিখ
function getNext7Days() {

    const dates = [];

    for (let i = 0; i < 7; i++) {

        const d = new Date();
        d.setDate(d.getDate() + i);

        dates.push(d.toISOString().split("T")[0]);

    }

    return dates;

}

async function getMatches() {

    showLoading(scheduleContainer, "Loading Schedule...");

    try {

        let allMatches = [];

        const dates = getNext7Days();

        const season = 2025;

        for (const date of dates) {

            for (const league of leagues) {

                const data = await fetchApiFootball(
                    `/fixtures?league=${league}&season=${season}&date=${date}`
                );

                if (data && data.response) {

                    allMatches.push(...data.response);

                }

            }

        }

        allMatches.sort((a, b) => {

            return new Date(a.fixture.date) - new Date(b.fixture.date);

        });

        scheduleContainer.innerHTML = "";
                if (allMatches.length === 0) {

            scheduleContainer.innerHTML = `
                <div class="card">
                    <h3>No Upcoming Matches</h3>
                    <p>There are no scheduled matches for the selected leagues.</p>
                </div>
            `;

            return;

        }

        allMatches.slice(0, 50).forEach(match => {

            const matchDate = new Date(match.fixture.date);

            scheduleContainer.innerHTML += `

            <div class="match">

                <div style="display:flex;justify-content:space-between;align-items:center;">

                    <div style="text-align:center;width:40%;">
                        <img src="${match.teams.home.logo}" width="45">
                        <br>
                        <b>${match.teams.home.name}</b>
                    </div>

                    <div style="text-align:center;width:20%;">
                        <strong>VS</strong>
                    </div>

                    <div style="text-align:center;width:40%;">
                        <img src="${match.teams.away.logo}" width="45">
                        <br>
                        <b>${match.teams.away.name}</b>
                    </div>

                </div>

                <hr>

                <div class="time">
                    📅 ${matchDate.toLocaleDateString()}
                </div>

                <div class="time">
                    🕒 ${matchDate.toLocaleTimeString()}
                </div>

                <div class="league">
                    🏆 ${match.league.name}
                </div>

                <div class="league">
                    🌍 ${match.fixture.venue?.city || "Unknown"}
                </div>

            </div>

            `;

        });
    } catch (error) {

        console.error("Schedule Error:", error);

        showError(
            scheduleContainer,
            "Failed to load match schedule."
        );

    }

}

// Start
getMatches();