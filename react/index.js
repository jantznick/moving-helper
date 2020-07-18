import {NewItem, NewRoom} from './react-components';

// ReactDOM.render(<NewItem name="Random Item" />, document.getElementById('haveList'));

document.getElementById("addItem").addEventListener("click", event => {
	event.preventDefault();
	var val = document.getElementById("selectOptions").value;
	var text = document.getElementById("itemName").value;

	console.log(val);
	console.log(text);

	ReactDOM.render(<NewItem val={val} name={text}/>, document.getElementById('haveList'));
});