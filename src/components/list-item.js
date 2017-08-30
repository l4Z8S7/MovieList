import React, {Component} from 'react';

class ListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			complete:true,
			title:'',
			priority:'',
			message:''
		};

		this.handleEdit = this.handleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.handleDislike = this.handleDislike.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
		this.handleInputBlur = this.handleInputBlur.bind(this);
	}

	handleChange(event) {
		this.setState({title:event.target.value});
	}

	handleEdit(event) {
		this.setState({complete:false});
	}

	handleSave(event) {
		if(this.state.title){
			this.props.handleChange(this.state.title, this.props.index);
		}	
		this.setState({complete:true});	
	}

	handleCancel(event) {
		this.setState({complete:true});
	}

	handleRemove(event) {
		if(this.props.listId === 1) {
			if(window.confirm(`You will remove the item: ${this.props.item.title}, continue?`)) {
				this.props.handleRemove(this.props.index, this.props.listId);
			}
		}	else {
			this.props.handleRemove(this.props.index, this.props.listId);
			this.props.handleAdd(this.props.item);
		}
	}

	handleLike(event) {
		this.props.handleLike(this.props.index, this.props.listId);
	}

	handleDislike(event) {
		this.props.handleDislike(this.props.index, this.props.listId);
	}

	handleInputChange(event) {
		this.setState({priority:event.target.value});
	}

	handleInputKeyUp(event) {
		const priority = Number(event.target.value);
		if(Number.isNaN(priority) || priority < 0) {
			this.setState({message:'Must be a positive number'});
		} else if(priority === 0) {
			if(this.state.message) {
				this.setState({message:''});
			}
		} else {
			this.setState({
				priority,
				message:''
			});
			if((event.which || event.keyCode) === 13) {
				this.props.handleSort(this.props.index, priority);
			}
		}

	}

	handleInputBlur(event) {
		this.props.handleSort(this.props.index, Number(this.state.priority));
	}

	render() {
		return (
			<tr>
				{
					this.props.listId === 1 ?
					<td className="col-md-1">
						<input className="form-control" value={this.state.priority} onChange={this.handleInputChange} onKeyUp={this.handleInputKeyUp} onBlur={this.handleInputBlur} />
						<p className="alert alert-danger" hidden={!this.state.message}>{this.state.message}</p>
					</td> : null
				}
				<td className="col-md-5">
					{
						this.state.complete ? 
						<div>{this.props.item.title}</div> : 
						<input className="form-control" value={this.state.title||this.props.item.title} onChange={this.handleChange} />
					}
				</td>

				<td className="col-md-2 row">
					<div className="col-md-6" onClick={this.handleLike}>
						{
							this.props.listId === 2 ?
							<span className="glyphicon glyphicon-heart btn btn-default"></span> :
							<span className="glyphicon glyphicon-heart-empty btn btn-default"></span>
						}
					</div>
					<div className="col-md-6" onClick={this.handleDislike}>
						{
							this.props.listId === 3 ?
								<span className="glyphicon glyphicon-star btn btn-default"></span> :
								<span className="glyphicon glyphicon-star-empty btn btn-default"></span>
						}
					</div>
				</td>
				

				<td className="col-md-2 row">
					{
						this.props.listId === 1 ?
						(
							this.state.complete ? 
							<div className="col-md-8 col-md-offset-2">
									<span onClick={this.handleEdit} className="glyphicon glyphicon-pencil btn btn-primary"></span>
							</div> :
							<div className="col-md-12">
								<div className="col-md-6">
									<span onClick={this.handleSave} className="glyphicon glyphicon-ok btn btn-success"></span>
								</div>
								<div className="col-md-6">
									<span onClick={this.handleCancel} className="glyphicon glyphicon-remove btn btn-warning"></span>
								</div>
							</div>
						) : null
					}
				</td>
				<td className="col-md-2">
					<span className="glyphicon glyphicon-trash btn btn-danger" onClick={this.handleRemove}></span>
				</td>
			</tr>
		);
	}	
}

export default ListItem;
