import React from 'react';
import ListItem from './list-item';

export default (props) => {
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
