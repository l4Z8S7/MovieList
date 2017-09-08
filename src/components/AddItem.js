import React ,{Component} from 'react';
import PropTypes from 'prop-types';

class AddItem extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			complete:true,
			item:{},
			message:''
		}

		this.handleAdd = this.handleAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleAdd(event) {
		this.setState({complete:false});
	}

	handleChange(event) {
		const newItem = {
			title:event.target.value
		}
		this.setState({item:newItem});
	}

	handleSave(event) {
		if(!this.state.item.title || this.props.handleAdd(this.state.item)) {
			this.setState({
				complete:true,
				message:''
			});
		}else{
			this.setState({message:'Item exist!'});
		}
	}

	handleCancel(event) {
		this.setState({
			complete:true,
			message:''
		})
	}

	render() {
		return (
			<div className="row">
				{
					this.state.complete ? 
					<div className="col-md-6 col-md-offset-3">
						<span className="glyphicon glyphicon-plus btn btn-primary btn-block" onClick={this.handleAdd}></span>
					</div> :
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-8">
								<input className="form-control" onChange={this.handleChange} placeholder="Add item title" />
							</div>
							<div className="col-md-2">
								<span className="glyphicon glyphicon-ok btn btn-success" onClick={this.handleSave}></span>
							</div>
							<div className="col-md-2">
								<span className="glyphicon glyphicon-remove btn btn-warning" onClick={this.handleCancel}></span>
							</div>
						</div>
						<p className="alert alert-danger" hidden={!this.state.message}>{this.state.message}</p>
					</div>
				}
			</div>
		);
	}
}

AddItem.propTypes = {
	handleAdd: PropTypes.func.isRequired
}

export default AddItem;