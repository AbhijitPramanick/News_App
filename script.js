const API_KEY = "bfc0b57c7c22465a9d6bfdff5d6863ee";
const url = "https://newsapi.org/v2/everything?q=";

// Now we want : Whenever window loads, a callback function is to be triggered.

window.addEventListener("load", () => {
  fetchNews("India");
});
function reload() {
  window.location.reload();
  console.log("Page reloaded");
}
async function fetchNews(query) {
  const res = await fetch(
    `${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`
  );
  const data = await res.json();
  console.log(data);

  //binding the articles hence obtaned after fetching the API, binding the articlkes means synthesizing of the cards with details of the articles

  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  //   to prevent duplicating of the existing contents of the "cards-container"
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    // Creating a card by cloning the 'template' from the HTML
    const cardClone = newsCardTemplate.content.cloneNode(true);
    // 'true' for deep clone

    // Filling in the details in each cardTemplate from the corresponding article
    fillDataInCard(cardClone, article);

    //Appending the card in the cardsContainer as the last child
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
  searchText.value = null;
});
