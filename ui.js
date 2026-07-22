function showLoading(element, text = "Loading...") {

element.innerHTML = `

<div style="text-align:center;padding:30px;">

<div style="
width:45px;
height:45px;
border:5px solid #334155;
border-top:5px solid #22c55e;
border-radius:50%;
margin:auto;
animation:spin 1s linear infinite;
"></div>

<p style="margin-top:15px;">
${text}
</p>

</div>

`;

}

function showError(element, text = "Failed to load data") {

element.innerHTML = `

<div class="card" style="text-align:center;">

<h2>❌ Oops!</h2>

<p>${text}</p>

<p style="color:#94a3b8;">

Please check your internet connection.

</p>

</div>

`;

}
// ===============================
// Global Theme Manager
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const theme = localStorage.getItem("theme");

    if (theme === "light") {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

});