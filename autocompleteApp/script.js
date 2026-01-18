const btnTheme = document.querySelector("#btn-theme");
btnTheme.addEventListener("click", function () {
    const body = document.querySelector("body");
    const currentTheme = body.getAttribute("data-bs-theme");

    let value = currentTheme == "dark" ? "light" : "dark";
    body.setAttribute("data-bs-theme", value);
    btnTheme.innerHTML = currentTheme === "dark" ? "dark⚫" : "light🔘";
})

const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

async function searchStates(searchText) {
    const res = await fetch("./state_capitals.json");
    const states = await res.json();

    if (searchText.trim() === "") {
        matchList.innerHTML = '';
        return; // Stop here if input is empty
    }

    let matches = states.filter(state => {
        let regex = new RegExp(`^${searchText}`, "gi");
        return state.abbr.match(regex) || state.name.match(regex)
    });

    // if (matches.length === 0) matches = [];
    console.log(matches);
    outputHtml(matches);
}

function outputHtml(matches) {
    if (matches.length > 0) {
        const html = matches.map(match =>
            `<div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr})
            <span class="text-primary">${match.capital}</span>
            </h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>`
        ).join('');

        matchList.innerHTML = html;
    }
}
search.addEventListener("input", () => searchStates(search.value));
