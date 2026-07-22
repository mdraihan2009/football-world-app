const newsContainer = document.getElementById("newsContainer");

async function loadNews() {

newsContainer.innerHTML = `
<p style="text-align:center;">
Loading Football News...
</p>
`;

try{

const response = await fetch(
"https://gnews.io/api/v4/search?q=football&lang=en&max=10&apikey=8fbf97457cf8e15563768fa237e8b663"
);

const data = await response.json();

newsContainer.innerHTML = "";

data.articles.forEach((article,index)=>{

newsContainer.innerHTML += `

<div class="match" onclick="openNews(${index})">

<img src="${article.image}" style="width:100%;border-radius:10px;margin-bottom:10px;">

<h3>${article.title}</h3>

<p>${article.description ?? ""}</p>

<div style="margin-top:10px;color:#94a3b8;font-size:13px;">

📰 ${article.source.name}

</div>

<div style="color:#94a3b8;font-size:13px;">

📅 ${article.publishedAt.substring(0,10)}

</div>

</div>

`;

});

localStorage.setItem("newsData", JSON.stringify(data.articles));

}catch(error){

newsContainer.innerHTML = `
<h3 style="text-align:center;color:red;">
❌ Failed to Load News
</h3>
`;

console.log(error);

}

}

function openNews(index){

localStorage.setItem("newsIndex", index);

location.href = "news-details.html";

}

loadNews();