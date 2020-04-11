//completed task

const container = document.getElementById("blog-post");
const loader = document.querySelector(".loader");
const limit = 5;
let page = 1;

const getMoreData = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  console.log(scrollTop, scrollHeight, clientHeight);
  if (scrollTop + clientHeight >= scrollHeight) {
    loader.classList.add("show-loader");
    setTimeout(() => {
      page++;
      getData();
    }, 1000);
  }
};

const getData = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await response.json();
  data.map((post) => {
    renderToDom(post);
  });
  console.log(data);
};
const renderToDom = (post) => {
  const blogElement = document.createElement("div");
  blogElement.classList.add("blog");
  blogElement.innerHTML = `<h1 class="blog-heading">${post.title}</h1>
    <p class="blog-content">${post.body}</p>`;
  container.appendChild(blogElement);
  loader.classList.remove("show-loader");
};
getData();
window.addEventListener("scroll", getMoreData);
