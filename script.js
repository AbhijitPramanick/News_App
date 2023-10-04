const API_KEY = "bfc0b57c7c22465a9d6bfdff5d6863ee";
const url = "https://newsapi.org/v2/everything?q=";

// Now we want : Whenever window loads, a callback function is to be triggered.

window.addEventListener("load", () => {
  fetchNews("India");
});

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = res.json();
  console.log(data);
}
