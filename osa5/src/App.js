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

    this.blogTitleInput = React.createRef()
    this.blogAuthorInput = React.createRef()
    this.blogUrlInput = React.createRef()

    this.submitLogin = this.submitLogin.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.submitBlog = this.submitBlog.bind(this)
  }

  async componentDidMount() {
    this.refreshBlogs()

    const cachedUser = localStorage.getItem('user')
    if (cachedUser) {
      this.setState({ user: JSON.parse(cachedUser) })
    }
  } 

  async submitLogin(event) {
    event.preventDefault()
    const user = await loginService.login(
      this.usernameInput.current.value,
      this.passwordInput.current.value
    )
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  async refreshBlogs() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
  }

  async submitBlog(event) {
    event.preventDefault()
    const newBlog = {
      title: this.blogTitleInput.current.value,
      author: this.blogAuthorInput.current.value,
      url: this.blogUrlInput.current.value,
    }
    await blogService.createBlog(newBlog, this.state.user.token)
    this.blogTitleInput.current.value = ''
    this.blogAuthorInput.current.value = ''
    this.blogUrlInput.current.value = ''
    this.refreshBlogs()
  }

  logoutUser(event) {
    event.preventDefault()
    this.setState({ user: null })
    localStorage.removeItem('user')
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
          <h1>blogs</h1>
          <p>
            {`${this.state.user.name} logged in`}
            <button onClick={this.logoutUser}>logout</button>
          </p>
          <h2>create new</h2>
          <form onSubmit={this.submitBlog}>
            <label>
              title:
              <input name="title" ref={this.blogTitleInput} />
            </label>
            <br />
            <label>
              author:
              <input name="author" ref={this.blogAuthorInput} />
            </label>
            <br />
            <label>
              url:
              <input name="url" ref={this.blogUrlInput} />
            </label>
            <br />
            <button type="submit">create</button>
          </form>
          <br />
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
        </div>
      );
  }
}

export default App;
