const wrapper = document.querySelector(".wrapper");
const btn = document.querySelector("button");
const input = document.getElementById("input");
const API_URL = `https://api.github.com`;

async function getRepositories() {
  try {
    const userName = input.value.trim();
    if (userName) {
      const response = await fetch(`${API_URL}/users/${userName}/repos`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user's repositories`);
      }
      const data = await response.json();
      return data;
    } else {
      throw new Error("Please enter a username");
    }
  } catch (error) {
    console.error(`Error: `, error);
  }
}

function createUserBlocks(repo) {
  const link = document.createElement("a");
  link.textContent = repo.full_name;
  link.href = repo.html_url;
  const githubIcon = document.createElement("i");
  githubIcon.className = "fa-brands fa-github fa-shake";

  const container = document.createElement("div");
  container.className = "user-blocks";
  container.appendChild(githubIcon);
  container.appendChild(link);
  wrapper.appendChild(container);

  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(link.href, "_blank");
  });
}

async function renderRepositories() {
  try {
    const repos = await getRepositories();
    if (repos.length === 0) {
      console.log("No repositories found");
      return;
    }
    repos.forEach((repo) => {
      createUserBlocks(repo);
    });
    console.log(repos);
  } catch (error) {
    console.error("Error rendering repositories: ", error);
  }
}

btn.addEventListener("click", renderRepositories);
