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
import UserComponent from './UserComponent'
import TitlesContainer from './TitlesContainer'

class App extends React.Component {
	
	state = {
		books: [],
		currentBook: {}
	}

	componentDidMount() {
		fetch('http://localhost:4000/books')
			.then(response => response.json())
			.then(data => this.setState({books: data}))
	}

	handleTitleClick = (id) => {
		const clickedBook = this.state.books.find(book => book.id === id)
		this.setState({currentBook: clickedBook})
	}

	handleUserClick = () => {
		const user = {"id":1, "username":"pouros"}
		const currentUsers = this.state.currentBook.users
		currentUsers.push(user)
		const data = {"users": currentUsers }
		const existingUser = this.state.currentBook.users.find(currentUser => currentUser.id === user.id)
		if (!existingUser) {
			fetch(`http://localhost:4000/books/${this.state.currentBook.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				})
					.then(response => response.json())
					.then(data => {
						console.log('Success:', data)
						this.setState({currentBook: data})
				})
		} else {
			fetch(`http://localhost:4000/books/${this.state.currentBook.id}/users/${user.id}`, {
				method: 'DELETE',
				})
					.then(response => response.json())
					.then(data => {
						console.log('Success:', data)
				})
		}
	}

	render() {
		const books = this.state.books.map(book => (<TitleComponent handleTitleClick={this.handleTitleClick} book={book} key={book.id} />))
		const currentBook = this.state.currentBook
		const currentUsers = this.state.currentBook.users
		const users = currentUsers ? currentUsers.map(user => (<UserComponent user={user} key={user.id} />)) : null
		const likes = currentUsers ? currentUsers.length : null
		return (
			<div>
				<Menu inverted>
					<Menu.Item header>Bookliker</Menu.Item>
				</Menu>
				<main>
					<TitlesContainer books={this.state.books} handleTitleClick={this.handleTitleClick}/>
					<Container text>
						<Header>{currentBook.title}</Header>
						<Image
							src={currentBook.img_url}
							size="small"
						/>
						<p>{currentBook.description}</p>
						<Button
							onClick={this.handleUserClick}
							color="red"
							content="Like"
							icon="heart"
							label={{
								basic: true,
								color: "red",
								pointing: "left",
								content: likes
							}}
						/>
						<Header>Liked by</Header>
						<List>
							{users}
						</List>
					</Container>
				</main>
			</div>
		);
	}
}

export default App;
