import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from '../components/SimpleBlog'

describe('<SimpleBlog />', () => {
  test('renders correctly', () => {
    const blog = {
      title: 'testblog',
      author: 'testman',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.title')
    const likesDiv = blogComponent.find('.likes')

    expect(titleDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  test('onClick prop gets called correctly', () => {
    const mockFn = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={{}} onClick={mockFn} />)
    const likeButton = blogComponent.find('button')
    likeButton.simulate('click')
    likeButton.simulate('click')
    expect(mockFn.mock.calls.length).toEqual(2)
  })
})
