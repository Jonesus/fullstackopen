import React from 'react'
import { TogglableSpan } from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => (
  <div style={blogStyle}>
    <TogglableSpan buttonLabel={`${blog.title} ${blog.author}`}>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {`${blog.likes} likes`}
      <button>like</button>
      <br />
      {`added by ${blog.user.name}`}
    </TogglableSpan>
  </div>  
)

export default Blog