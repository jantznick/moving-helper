const categories = [{
	value: "have",
	title: "Things We Have"
}, {
	value: "need",
	title: "Things We Need"
}, {
	value: "rid",
	title: "Things We're Getting Rid Of"
}];

const selectOptions = document.getElementById("selectOptions");
const roomSelector = document.getElementById("rooms");

categories.map(category => {
	var option = document.createElement("option");
	option.value = category.value;
	option.innerText = category.title;
	selectOptions.appendChild(option);
})

var createRoom = (event) => {
	var container = document.createElement("div");
	var title = document.createElement("h4");
	var list = document.createElement("div");
	container.id = event.value;
	container.classList.add("user-panel");
	title.classList.add("user-name");
	title.innerText = event.name;
	list.classList.add("task-list");
	list.id = `${event.value}-list`.replace(" ","").toLowerCase();
	list.setAttribute("ondrop", "drop(event,this)");
	list.setAttribute("ondragover", "allowDrop(event)");
	container.appendChild(title);
	container.appendChild(list);
	roomSelector.appendChild(container);
}

document.getElementById("addItem").addEventListener("click", event => {
	event.preventDefault();
	var val = document.getElementById("selectOptions").value;
	var text = document.getElementById("itemName").value;

	if (document.getElementById(text.replace(" ",""))) {
		var error = document.createElement("p");
		error.innerText = `Only 1 item name ${text} allowed`;
		error.id = "addItemError";

		document.getElementById("newItemForm").appendChild(error);
	}

	if (document.getElementById("addItemError")) {
		document.getElementById("addItemError").remove();
	}

	createItem({
		val,
		text,
		room: null
	})

	document.getElementById("itemName").value = "";
});

document.getElementById("addRoom").addEventListener("click", event => {
	event.preventDefault();
	var val = document.getElementById("roomName").value;

	createRoom({
		name: val,
		value: val.replace(" ", "")
	})

	document.getElementById("roomName").value = "";
})

var createItem = (event) => {
	var newE = document.createElement("div");
	newE.classList.add("task");
	newE.classList.add(event.val)
	newE.draggable = "true";
	newE.id = event.text.replace(" ", "");
	newE.innerText = event.text;
	newE.setAttribute("onClick","activateEditModal(this)")
	var icon = document.createElement("i");
	icon.className = "fa fa-edit";
	newE.appendChild(icon);

	if (event.room) {
		document.getElementById(`${event.room}-list`).appendChild(newE);
	} else {
		document.getElementById(`${event.val}List`).appendChild(newE);
	}
}

document.getElementById("editItem").addEventListener("click", event => {
	event.preventDefault();
	editItem({
		newValue: document.getElementById("editItemName").value,
		originalValue: document.getElementById("originalItemName").value
	});
});

var editItem = ({newValue, originalValue}) => {
	var icon = document.createElement("i");
	icon.className = "fa fa-edit";

	document.getElementById(originalValue).innerText = newValue;
	document.getElementById(originalValue).appendChild(icon);
	document.getElementById(originalValue).id = newValue.replace(" ","");

	document.getElementById("modal").classList.add("hideModal")
}

document.getElementById("closeModal").addEventListener("click", event => {
	document.getElementById("modal").classList.add("hideModal")
})

if (!!window.location.search) {
	var listId = window.location.search;
	var newP = document.createElement("p");
	newP.id = "listShareUrl";
	newP.innerHTML = `List Share URL: <a href='${window.location.origin + listId}'>${window.location.origin + listId}</a>`;
	var before = document.getElementById("newItemForm");
	before.parentElement.insertBefore(newP, before)

	fetch(`${window.location.origin}/get-data${listId}`)
	.then(response => response.json())
	.then(json => {
		if (Object.keys(json).length < 1) {
			window.location.search = '';
		}
		var nospace = [];
		if (json.rooms) {
			json.rooms.forEach(x => nospace.push(x.replace(" ","")))
			json.rooms.map(room => {
				createRoom({
					name: room,
					value: room.replace(" ", "")
				})
			})
		}
		if (json.items) {
			json.items.map(item => {
				var room = null;
				if (nospace.indexOf(item.room) > -1) {
					room = item.room;
				}
				createItem({
					val: item.category,
					text: item.title,
					room
				})
			})
		}
	});
}

document.getElementById("saveList").addEventListener("click", () => {
	event.preventDefault();
	var data = {
		rooms: [],
		items: [],
		listId: window.location.search || window.listId
	};

	if (document.getElementById("rooms").children.length > 0) {
		Array.from(document.getElementById("rooms").children).map(room => {
			data.rooms.push(room.firstElementChild.innerText)
		})
	}

	if (document.getElementsByClassName("task").length > 0) {
		Array.from(document.getElementsByClassName("task")).map(task => {
			data.items.push({
				title: task.innerText,
				category: task.classList.value.replace("task ",""),
				room: task.parentElement.parentElement.id
			})
		})
	}

	var xhr = new XMLHttpRequest();
	xhr.open('POST', `${window.location.origin}/save`, false);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send(JSON.stringify(data));

	if (xhr.status === 200) {
		var listId = JSON.parse(xhr.responseText).code;
		window.listId = listId;
		if (!(window.location.search.replace("?listId=","") === listId)) {
			var newP = document.createElement("p");
			newP.id = "listShareUrl";
			newP.innerText = `List Share URL: http://blah.com/list?listId=${listId}`;
			var before = document.getElementById("newItemForm");
			before.parentElement.insertBefore(newP, before)
			window.location.search = `?listId=${listId}`
		} else {
			document.getElementById("saveList").innerText = "SAVED"
			document.getElementById("saveList").style.background = "#005c0c"
			document.getElementById("saveList").style.borderColor = "#005c0c"
			document.getElementById("saveList").style.color = "white"
			document.getElementById("saveList").style.boxShadow = "0px 0px 50px 10px rgba(0,0,0,0.75)"
			setTimeout(() => {
				document.getElementById("saveList").innerText = "SAVE LIST"
				document.getElementById("saveList").style.background = ""
				document.getElementById("saveList").style.borderColor = ""
				document.getElementById("saveList").style.color = ""
				document.getElementById("saveList").style.boxShadow = ""
			}, 750);
			setTimeout(() => {
				document.getElementById("saveList").style.boxShadow = ""
			}, 100);
		}
	}

})
