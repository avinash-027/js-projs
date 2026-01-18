// On page load, check if localStorage has saved items; if not, save the existing hardcoded list items to localStorage:
// Before loading items from localStorage, clear the existing list to avoid duplicates:

document.addEventListener("DOMContentLoaded",
	() => loadData()
)

var form = document.querySelector("form")
var itemList = document.querySelector("#items")
var filter = document.getElementById("filter")

form.addEventListener("submit", addItems);
function addItems(e) {
	e.preventDefault();
	// get input value
	var newItem = document.getElementById("item")
	// empty input field has a value of an empty string (""), not null.
	if (newItem.value.trim() !== "") {
		// create new li element
		var li = document.createElement("li")
		li.className = "list-group-item"
		li.innerText = newItem.value
		// create new btn element
		var del = document.createElement("button")
		del.className = "btn btn-danger btn-sm float-end delete"
		del.innerText = "X"
		// append del btn => list
		li.append(del)
		// append li element => itemList
		itemList.appendChild(li)

		newItem.value = ""

		// localStorage 
		const items = itemList.children;
		const itemsArray = Array.from(items).map(li => li.firstChild.textContent);
		localStorage.setItem("items", JSON.stringify(itemsArray));
	}
}

function loadData() {
	var items = localStorage.getItem("items")
	if (items) {
		const itemsArray = JSON.parse(items)
		itemsArray.forEach(i => {
			// create new li element
			var li = document.createElement("li")
			li.className = "list-group-item"
			li.innerText = i
			// create new btn element
			var del = document.createElement("button")
			del.className = "btn btn-danger btn-sm float-end delete"
			del.innerText = "X"
			// append del btn => list
			li.append(del)
			// append li element => itemList
			itemList.appendChild(li)
		})
	}
}

// var delButtons = document.querySelectorAll(".delete");

// delButtons.forEach(function(button) {
// 	button.addEventListener("click", deleteItem);
// });

// function deleteItem(e) {
// 	if (e.target.classList.contains("delete")) {
// 		var li = e.target.parentElement
// 		itemList.removeChild(li)
// 	}
// }

// You cannot call .addEventListener() directly on an HTMLCollection — just like with a NodeList, you must loop over the elements individually.
// delButton.addEventListener("click", deleteItem)

// prefer: Event Delegation - With delegation, do once

itemList.addEventListener("click", deleteItem)
function deleteItem(e) {
	// console.log(e.target.className);
	if (e.target.classList.contains("delete")) {
		// console.log(e.target);
		// if (confirm("Are U Sure..")) {
			var li = e.target.parentElement
			itemList.removeChild(li)

			// Update localStorage after deletion
			const items = itemList.children;
			const itemsArray = Array.from(items).map(li => li.firstChild.textContent);
			localStorage.setItem("items", JSON.stringify(itemsArray));

			showAlert("Item deleted successfully!", "success");
		// }
	}
}

function showAlert(msg , type = success) {
	const alert = document.getElementById("alertBox")
	alert.className = `alert alert-${type}`
	alert.textContent = msg
	alert.classList.remove("d-none")

	setTimeout(() => {
		alert.classList.add("d-none")
	}, 2000);
}

filter.addEventListener('keyup', filterItems)
function filterItems(e) {
	var text = e.target.value.toLowerCase();
	var items = itemList.getElementsByTagName('li')

	// Convert to Array
	Array.from(items).forEach(function (item) {
		// console.log(item.childNodes);
		// console.log(item.childElementCount);

		// innerText: This property gets the "visible" text of the element, but since firstChild might not be a clean text node (it may contain extra whitespace or other unexpected nodes), it can result in undefined.
		// var value = item.firstChild.innerText
		var value = item.firstChild.textContent.toLowerCase()
		// console.log(value);
		// if (value.includes(text)) 
		if (value.indexOf(text) == -1) {
			item.style.display = "none"
		} else {
			item.style.display = "block"
		}
	}
	);
}