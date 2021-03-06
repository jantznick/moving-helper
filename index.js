module.exports = `
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<link href="style.css" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<script src="pre.js"></script>
	<script src="DragDropTouch.js"></script>

</head>
<body>
	<div id="page">
		<div id="workarea">
			<div id="header">
				<h1>Moving Things Helper </h1>
				<form action="/" id="saveListForm">
					<button id="saveList">SAVE LIST</button>
				</form>
			</div>
			<!-- <div id="completed-tasks">
				<h3>
					<em class="icon-ok icon-large"></em>
				</h3>
			</div>#completed-tasks -->

			<form action="/" id="newItemForm">
				<label>Add Item:</label>
				<input id="itemName" type="text"></input>
				<label>Select Location:</label>
				<select id="selectOptions">
				</select>
				<button id="addItem">ADD ITEM</button>
			</form>

			<form id="newRoomForm">
				<label>Add Room:</label>
				<input id="roomName" type="text"></input>
				<button id="addRoom">ADD ROOM</button>
			</form>

			<hr class="pageSplitter">
			<h1>Things</h1>

			<div id="users" class="user-panels">
				<div id="categories">
					<div id="user-2" class="user-panel">
						<h4 class="user-name">Things We Have</h4>

						<div id="haveList" class="task-list" ondrop="drop(event,this)" ondragover="allowDrop(event)">
						</div>
					</div>
					<div id="user-3" class="user-panel">
						<h4 class="user-name">Things We Need</h4>

						<div id="needList" class="task-list" ondrop="drop(event,this)" ondragover="allowDrop(event)">
						</div>
					</div>
					<div id="user-4" class="user-panel">
						<h4 class="user-name">Things We're Getting Rid Of</h4>

						<div id="ridList" class="task-list" ondrop="drop(event,this)" ondragover="allowDrop(event)">
						</div>
					</div>
				</div>

				<hr class="pageSplitter">
				<h1>Rooms</h1>

				<div id="rooms">
				</div>

			</div><!-- #users -->
		</div><!-- #workarea -->
	</div><!-- #page -->

	<div id="modal" class="hideModal">
		<div id="modalWindow">
			<i id="closeModal" class="fa fa-window-close" aria-hidden="true"></i>
			<form action="/" id="modalForm">
				<label>Edit Item:</label>
				<input id="editItemName" type="text"></input>
				<input id="originalItemName" type="hidden">
				<button id="editItem">EDIT ITEM</button>
			</form>
		</div>
	</div>

	<script src="post.js"></script>

</body>
</html>
`;
