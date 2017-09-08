import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const ItemList =  props => {
	if(!props.data.length) {
		return <div>List is empty!</div>;
	}

	return (
		<table className="table table-hover">
			<thead>
				{
					props.listId ===1 ? 
					<tr>
						<td>Priority</td>
						<td>Title</td>
						<td>Like / Dislike</td>
						<td>Edit</td>
						<td>Remove</td>
					</tr> : null
				}
			</thead>
			<tbody>
			{
				props.data.map((item, index) => <ListItem 
          key={item.title} 
          index={index} 
          item={item} 
          listId={props.listId}
          handleChange={props.handleChange} 
          handleRemove={props.handleRemove}
          handleLike={props.handleLike}
          handleDislike={props.handleDislike}
          handleAdd={props.handleAdd}
          handleSort={props.handleSort} />)
			}
			</tbody>
		</table>
	);
}

ItemList.propTypes = {
	data: PropTypes.array.isRequired,
	listId: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleDislike: PropTypes.func.isRequired,
	handleAdd: PropTypes.func.isRequired,
	handleSort: PropTypes.func.isRequired
}
export default ItemList;

