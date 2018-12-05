import React from 'react'
import { TogglableSpan } from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog, likeCallback, deleteCallback}) => (
  <div style={blogStyle}>
    <TogglableSpan buttonLabel={`${blog.title} ${blog.author}`}>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {`${blog.likes} likes`}
      <button onClick={likeCallback}>like</button>
      <br />
      {`added by ${blog.user.name}`}
      <br />
      {deleteCallback &&
        <button onClick={deleteCallback}>delete</button>
      }
    </TogglableSpan>
  </div>  
)

export default Blog