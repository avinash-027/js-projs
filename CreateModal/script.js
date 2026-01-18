const modal = document.querySelector("#simpleModal")
const modalBtn = document.getElementById("modalBtn")
const closeBtn = document.getElementsByClassName("closeBtn")[0]

modalBtn.addEventListener("click", openModal)
closeBtn.addEventListener("click", closeModal)

// | Event Type              | Best Listener          | Reason                                           |
// | ----------------------- | ---------------------- | ------------------------------------------------ |
// | `keyup` (Escape)        | `document`             | document is the correct place to listen for key events, because keyup events bubble up from the focused element to the document. window works too, but document is semantically more appropriate for key handling. |
// | `click` (outside modal) | `window` or `document` | Click events bubble up to both document and window, so both work — but most developers use window here because it’s common in modal implementations and slightly easier to reason about for global mouse events.         |


document.addEventListener("keyup", (event) => {
    if (event.key == "Escape" && event.target == modal) {
        modal.style.setProperty("display", "none")
    }
})
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.setProperty("display", "none")
    }
})

function openModal() {
    modal.style.setProperty("display", "block")
}
function closeModal() {
    modal.style.display = "none"
}
