const API_KEY="ba5fe33f48e74c1c8cc182c73931528b";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article) {
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    if (newsImg) newsImg.src = article.urlToImage;
    if (newsTitle) newsTitle.innerHTML = article.title;
    if (newsDesc) newsDesc.innerHTML = article.description;

    if (newsSource) {
        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });
        newsSource.innerHTML=`${article.source.name} . ${date}`;
    }
    cardClone.firstElementChild.addEventListener('click',() => 
        window.open(article.url,"_blank"))
}


let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener("click",() => {
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove("active");
    currSelectedNav=null;
})

function reload(){
    window.location.reload();
}
var crsr=document.querySelector("#cursor");
var blur=document.querySelector("#cursor-blur");
document.addEventListener("mousemove",function(dets){
    crsr.style.left= dets.x+30+"px";
    crsr.style.top= dets.y+"px";
    blur.style.left= dets.x - 250 + "px";
    blur.style.top= dets.y - 250 + "px";
  })
  