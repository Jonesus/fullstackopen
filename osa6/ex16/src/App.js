import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import {
  Menu as StyleMenu,
  Container,
  Table,
  Grid,
  Image,
  Form,
  Button,
  Message,
} from "semantic-ui-react";

const Menu = () => (
  <StyleMenu fixed="top" inverted>
    <StyleMenu.Item link>
      <NavLink exact to="/">
        anecdotes
      </NavLink>
    </StyleMenu.Item>
    <StyleMenu.Item link>
      <NavLink exact to="/create">
        create new
      </NavLink>
    </StyleMenu.Item>
    <StyleMenu.Item link>
      <NavLink exact to="/about">
        about
      </NavLink>
    </StyleMenu.Item>
  </StyleMenu>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => (
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <NavLink to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </NavLink>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <p>has {anecdote.votes} votes.</p>
    <p>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
);

const About = () => (
  <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
          An anecdote is a brief, revealing account of an individual person or
          an incident. Occasionally humorous, anecdotes differ from jokes
          because their primary purpose is not simply to provoke laughter but to
          reveal a truth more general than the brief tale itself, such as to
          characterize a person by delineating a specific quirk or trait, to
          communicate an abstract idea about a person, place, or thing through
          the concrete details of a short narrative. An anecdote is "a story
          with a point."
        </em>

        <p>
          Software engineering is full of excellent anecdotes, at this app you
          can find the best and add more.
        </p>
      </Grid.Column>
      <Grid.Column>
        <Image
          circular
          size="medium"
          centered
          src="http://jimgray.azurewebsites.net/Photos/Portrait1.jpg"
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      info: "",
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
    });
    this.props.notify(`Added new anecdote: ${this.state.content}`);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            content
            <input
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            author
            <input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            url for more info
            <input
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button>create</Button>
        </Form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: "If it hurts, do it more often",
          author: "Jez Humble",
          info:
            "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
          votes: 0,
          id: "1",
        },
        {
          content: "Premature optimization is the root of all evil",
          author: "Donald Knuth",
          info: "http://wiki.c2.com/?PrematureOptimization",
          votes: 0,
          id: "2",
        },
      ],
      notification: "",
    };
  }

  notify = msg => {
    this.setState({ notification: msg });
    setTimeout(() => this.setState({ notification: "" }), 10000);
  };

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) });
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    return (
      <Container>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            {this.state.notification && (
              <Message success>{this.state.notification}</Message>
            )}
            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/create"
              render={({ history }) => (
                <CreateNew
                  addNew={this.addNew}
                  history={history}
                  notify={this.notify}
                />
              )}
            />
            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />
              )}
            />
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
