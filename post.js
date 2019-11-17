const categories = [{
    value: "have",
    title: "Things We Have"
}, {
    value: "need",
    title: "Things We Need"
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
    newE.classList.add(event.val === "have" ? "have" : "need")
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