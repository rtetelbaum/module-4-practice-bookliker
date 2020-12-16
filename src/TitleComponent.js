import React from 'react'
import {
  Menu,
} from "semantic-ui-react";

function TitleComponent(props) {
	return (
		<Menu.Item as={"a"} onClick={() => props.handleTitleClick(props.book.id)}>{props.book.title}</Menu.Item>
	)
}

export default TitleComponent