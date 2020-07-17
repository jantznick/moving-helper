class NewItem extends React.Component {

	render () {
		return (
			<React.Fragment>
				<div className="task have" draggable="true" id="something" onClick="activateEditModal(this)">
					{this.props.name}<i className="fa fa-edit"></i>
				</div>
			</React.Fragment>
		)
	}
}

class NewRoom extends React.Component {

	render () {
		return (
			<React.Fragment>

			</React.Fragment>
		)
	}
}

ReactDOM.render(<NewItem name="Random Item" />, document.getElementById('haveList'));