module.exports = `
@import url(https://fonts.googleapis.com/css?family=Lato);
body {
  background-color: #eaeaea;
  color: #333;
  font-family: Lato;
  -webkit-font-smoothing: antialiased;
}
#header {
  display:flex;
  align-items:flex-end;
}
h1 {
  margin: 20px 0;
  text-align: left;
  color: #da4453;
}
#header h1 {
  margin-bottom:0;
}
h2 {
  text-align: right;
  line-height: 1;
  margin: 0 0 10px 0;
  padding: 0;
}
h3 {
  line-height: 1.5;
  margin: 0;
  padding: 0;
  color: #ed5565;
}
h4 {
  line-height: 1;
  margin: 0;
  margin-bottom: 0.5em;
  padding: 0;
  text-align: left;
  color: #ed5565;
}
a {
  color: #e8273b;
  transition: all 0.3s ease-in-out;
}
a:hover {
  color: #c71528;
  text-shadow: 0px 0px 12px #ed5565;
}
#page {
  width: 960px;
  margin: 0px auto;
}
#users h3 {
  text-align: right;
}
#completed-tasks {
  float: left;
  width: 23%;
  padding: 0px;
  overflow-x: hidden;
}
#completed-tasks.open {
  width: 23%;
}
#completed-tasks .actions {
  display: none;
}
#completed-tasks .task {
  border-width: 0px 0px 1px 0px;
}
#completed-tasks .task p {
  text-decoration: line-through;
}
.user-panel {
  display: inline-block;
  padding: 8px;
  width: 200px;
  vertical-align: top;
  background-color: #fff;
  border-radius: 3px;
  margin-right:8px;
}
.user-name.over ~ .task-list {
  border: 3px dashed #dadada;
}
.toolbar {
  text-align: right;
  line-height: 30px;
  padding: 0px 6px;
  display: none;
}
.task-list {
  position: relative;
  margin: 4px 0px 0px 0px;
  min-height:20px;
}
.task {
	position: relative;
	background-color: #eaeaea;
	text-align: left;
	padding: 0px 0px 0px 4px;
	margin: 0px 0px 1px 0px;
	border: 1px solid #dadada;
	border-width: 1px 1px 0px 1px;
	color: #f1f1f1;
	line-height: 30px;
	display: inline-block;
	width: 90%;
	vertical-align: top;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
}
.task.have {
	background-color: #005c0c;
}
.task.need {
	background-color: #b3000f
}
.task:last-child {
  border-width: 1px;
}
.actions {
  position: absolute;
  display: inline-block;
  padding: 0px;
  margin: 0px -200px 0 0;
  width: 19px;
  height: 22px;
  z-index: 10;
  overflow: hidden;
  background-color: #fff;
  opacity: 0.5;
  transition: all 0.75s ease-in-out;
}
.actions:hover {
  width: 150px;
  opacity: 1;
}
.actions a {
  padding: 0px 10px;
}
.task.over {
  border-bottom: 3px dashed #dadada;
}

.pageSplitter {
	margin: 15px 0;
}


/* MODAL CSS */
#modal {
	background: rgba(1,1,1,0.75);
	height:100vh;
	width:100vw;
	z-index:9999;
	position: absolute;
	top: 0;
	left: 0;
}

.hideModal {
	display:none;
}

#modalWindow {
	width: 50vw;
    height: 50vh;
    background: white;
    position: relative;
    margin: 25vh 25vw;
}

#modalForm {

}

button,
input {
  background-color: rgba(0,0,0,0);
  border: 3px solid #da4453;
  padding: 1em;
  border-radius: 15px;
  font-weight:900;
  transition:200ms;
}
button:hover {
  cursor: pointer;
  background-color: #da4453;
  color: white;
}

/* SAVE FORM CSS */
#saveListForm {
  margin-block-end: unset;
  margin-left: 2em;
}
#saveList {

}
#saveList:hover {

}
#listShareUrl {
  margin-top: 0;
}
#newItemForm {
  margin-top: 25px;
}
`