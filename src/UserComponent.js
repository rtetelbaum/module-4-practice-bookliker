import React from 'react'
import {
  List
} from "semantic-ui-react";

function UserComponent(props) {
	return (
		<List.Item icon="user" content={props.user.username} />
	)
}

export default UserComponent