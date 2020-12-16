import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
import TitleComponent from './TitleComponent';

function TitleContainer(props) {
	const books = props.books.map(book => (<TitleComponent handleTitleClick={props.handleTitleClick} book={book} key={book.id} />))
	return (
		<Menu vertical inverted>
			{books}
		</Menu>
	)
}

export default TitleContainer