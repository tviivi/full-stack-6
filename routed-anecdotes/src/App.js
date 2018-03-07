import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const style = {
  color: 'red',
  backgroundColor: 'lightgray',
  fontStyle: 'normal',
  fontSize: 18,
  width: 250
}

const Menu = () => (
  <div style={style}>
    <Link to="/anecdotes">anecdotes</Link> &nbsp;
    <Link to="/createnew">create new</Link> &nbsp;
    <Link to="/about">about</Link> &nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => <tr key={anecdote.id}>
          <td><Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}</Link>
            </td>
            </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div className="container">
    <img src="https://fi.wikipedia.org/wiki/Linus_Torvalds#/media/File:Linus_Torvalds.jpeg" class="img-responsive" alt="Responsive image"></img>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

const Anecdote = (props) => {
  return (
    <div>
      <h2>{props.anecdote.content} by {props.anecdote.author}</h2>
      <p>has {props.anecdote.votes} votes</p>
      <p>for more info see {props.anecdote.info}</p>
    </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div>
            <ControlLabel>content</ControlLabel>
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            <ControlLabel>author</ControlLabel>
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            <ControlLabel>url for more info</ControlLabel>
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: 'a new anecdote "' + anecdote.content + '" created :)' })
    const temporary = this
    setTimeout(function () { temporary.setState({ notification: '' }) }, 10000)
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(anecdote => anecdote.id === id)

  render() {

    const style = {
      color: 'gray',
      backgroundColor: 'lightblue',
      fontStyle: 'normal',
      fontSize: 18,
      width: 500
    }

    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <div style={style}>{this.state.notification}</div>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/createnew" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;