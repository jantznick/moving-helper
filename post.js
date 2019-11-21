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
        return console.log("bruh");
    }

    if (document.getElementById("addItemError")) {
        document.getElementById("addItemError").remove();
    }

    createItem({
        val,
        text
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

    document.getElementById(`${event.val}List`).appendChild(newE);
}

document.getElementById("editItem").addEventListener("click", event => {
    event.preventDefault();
    editItem({
        newValue: document.getElementById("editItemName").value,
        originalValue: document.getElementById("originalItemName").value
    });
});

document.getElementById("saveList").addEventListener("click", event => {
    event.preventDefault();
    console.log("list being saved");
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
    newP.innerText = `List Share URL: http://blah.com/list${listId}`;
    var before = document.getElementById("newItemForm");
    before.parentElement.insertBefore(newP, before)

    fetch(`http://localhost:3000/get-data${listId}`)
    .then(response => response.json())
    .then(json => {
        json.rooms.map(room => {
            createRoom({
                name: room,
                value: room.replace(" ", "")
            })
        })
        json.items.map(item => {
            createItem({
                val: item.category,
                text: item.title
            })
        })
    });
}

document.getElementById("saveList").addEventListener("click", () => {
    var data = {
        rooms: [],
        items: []
    };

    if (document.getElementById("rooms").children.length > 0) {
        Array.from(document.getElementById("rooms").children).map(room => {
            data.rooms.push(room.innerText)
        })
    }

    if (document.getElementsByClassName("task").length > 0) {
        Array.from(document.getElementsByClassName("task")).map(task => {
            data.items.push({
                title: task.innerText,
                category: task.classList.value.replace("task ","")
            })
        })
    }

    console.log(data);
    try {
        const posted = postData(data);
        console.log(posted);
    } catch (error) {
        console.error(error);
    }
})

async function postData(data = {}) {
    const response = fetch("http://localhost:3000/saveData", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data) 
    });
    console.log(response);
    return await response.json();
}
