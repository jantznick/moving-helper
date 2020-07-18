export class NewItem extends React.Component {

	render () {
		return (
			<React.Fragment>
				<div className={'task ' + this.props.val} draggable="true" id="something">
					{this.props.name}<i className="fa fa-edit"></i>
				</div>
			</React.Fragment>
		)
	}
}

export class NewRoom extends React.Component {

	render () {
		return (
			<React.Fragment>

			</React.Fragment>
		)
	}
}

export class Index extends React.Component {

	render () {

	}
}
