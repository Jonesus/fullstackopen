import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null
    }
    this.usernameInput = React.createRef()
    this.passwordInput = React.createRef()

    this.submitLogin = this.submitLogin.bind(this)
  }

  async submitLogin(event) {
    event.preventDefault()
    const user = await loginService.login(
      this.usernameInput.current.value,
      this.passwordInput.current.value
    )
    this.setState({ user })
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
  } 

  render() {
    return this.state.user === null
      ? (
        <div>
          <h1>Log in to application</h1>
          <form onSubmit={this.submitLogin}>
            <label>
              username:
              <input name="username" ref={this.usernameInput} />
            </label>
            <br />
            <label>
              password:
              <input name="password" ref={this.passwordInput} />
            </label>
            <br />
            <button type="submit">submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <h3>{`${this.state.user.name} logged in`}</h3>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>
      );
  }
}

export default App;
