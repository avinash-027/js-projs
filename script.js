const root = document.documentElement;
const floatContainer = document.getElementsByClassName('float-container');
const projsLoad = document.getElementById('projs');

const projects = {
  "TextToSpeech&SynthesisApp": ["https://github.com/avinash-027/text-to-audio", "Convert text input to spoken voice (Web Speech API)."],
  "Portfolio": ["https://github.com/avinash-027/portfolio-01", "Personal web portfolio"],
  "weightConverterApp": ["weightConverterApp\\index.html", "Convert weights between multiple units."],
  "AnimeSearch": ["CSS-Proj\\AnimeSearch\\index.html", "Search and display anime data from jikanAPI."],
  "MouseFollower": ["CSS-Proj\\MouseFollower\\index.html", "Icon smoothly follows the mouse cursor."],
  "Weather": ["CSS-Proj\\Weather\\index.html", "Shows weather info from OpenWeather-API/geocoding-api-open-meteo."],
  "filterList": ["filterList\\index.html", "Contacts : Filterable-List."],
  "CreateModal": ["CreateModal\\index.html", "Modal-Dialog"],
  "autocompleteApp": ["autocompleteApp\\index.html", "Auto-suggest input field (State Capital LookUp)"],
  "ItemLister": ["ItemLister\\index.html", "Add and remove items."],
  "To-Do List App": ["ToDoList\\index.html", "simple and interactive To-Do List app built using HTML, CSS, and JavaScript.📂📁"],
  "dragAndDrop": ["html-api\\dragAndDrop.html", "dragAndDrop"],
  "Geolocation": ["html-api\\geolocation.html", "Geolocation API."],
  "Simple To-Do List App": ["ToDoList-Simple\\index.html", "simple To-Do List app 📂📁"],
  "T-Rex Game": ["T-Rex\\index.html", "A simple browser-based T-Rex game where you control the dinosaur to jump over obstacles."],
  "Dino Game": ["dino\\index.html", "A simple browser-based Dino game inspired by the Google Chrome offline game. It tracks and saves your high score using localStorage."],
};
// add projects
Object.entries(projects).forEach(element => {
  // console.log(element)
  projsLoad.innerHTML += `
    <a href="${element[1][0]}" target="_blank">
    <div class="card">
      <h3>${element[0]}</h3>
      <p>${element[1][1]}</p>
    </div>   
    </a>`
});

const themeSet = {
  theme1: {
    bg: "#242933",
    fg: "#ffffff",
    accent: "#939eae"
  },
  theme2: {
    bg: "#fff4f2",
    fg: "#424140",
    accent: "#8f6a5e"
  },
  theme3: {
    bg: "#0E1923",
    fg: "#D6E8EE",
    accent: "#5ACCF0"
  }
};
// Change variables dynamically
function setTheme(bg, fg, accent) {
  root.style.setProperty('--background', bg);
  root.style.setProperty('--foreground', fg);
  root.style.setProperty('--accent', accent);
}
// add click events to themes 
Object.keys(themeSet).forEach(element => {
  const theme = document.querySelector(`.float-container #${element}`)
  // console.log(theme);
  // console.log(themeSet[`${element}`].bg);
  theme.addEventListener("click", () => {
    // here, element is a variable name, not a property of themeSet.
    setTheme(themeSet[element].bg, themeSet[element].fg, themeSet[element].accent)
    // console.log(root.style.getPropertyValue('--background'));
  })
})