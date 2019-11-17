module.exports = `

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, el) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (ev.target.childNodes.length > 1) {
        nextNode = ev.target.nextElementSibling;
        var parent = ev.target.parentNode;
        var moved = document.getElementById(data);
        parent.insertBefore(moved, nextNode);
    } else {
        el.appendChild(document.getElementById(data))
    }

}

document.addEventListener("dragstart", function( event ) {
    dragged = event.target;
    event.dataTransfer.setData("text", dragged.id)
    event.target.style.opacity = .25;
}, false);

document.addEventListener("dragend", function( event ) {
    event.target.style.opacity = "";
    if (document.getElementsByClassName("over").length > 0) {
        document.getElementsByClassName("over")[0].classList.remove("over")
    }
}, false);

document.addEventListener("dragenter", function( event ) {
    if ( event.target.className == "task" || "task-list" ) {
        event.target.classList.add("over");
    }

}, false);

document.addEventListener("dragleave", function( event ) {
    if ( event.target.className == "task over" || "task-list over" ) {
        event.target.classList.remove("over");
    }

}, false);

var activateEditModal = (event) => {
    document.getElementById("modal").classList.remove("hideModal");
    document.getElementById("editItemName").value = event.id;
    document.getElementById("originalItemName").value = event.id;
}
`