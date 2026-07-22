const newsDetails = document.getElementById("newsDetails");

const newsData = JSON.parse(localStorage.getItem("newsData"));
const newsIndex = localStorage.getItem("newsIndex");

if(!newsData || newsIndex===null){

newsDetails.innerHTML = `
<p style="text-align:center;">
❌ No News Selected
</p>
`;

}else{

const article = newsData[newsIndex];

newsDetails.innerHTML = `

<div class="match">

<img src="${article.image}" 
style="width:100%;border-radius:10px;margin-bottom:15px;">

<h2>${article.title}</h2>

<p style="margin-top:15px;">
${article.description ?? ""}
</p>

<hr>

<p>
📰 <b>Source:</b> ${article.source.name}
</p>

<p>
📅 <b>Date:</b> ${article.publishedAt.substring(0,10)}
</p>

<br>

<a href="${article.url}" target="_blank">

<button class="back-btn">

🌐 Read Full News

</button>

</a>

</div>

`;

}