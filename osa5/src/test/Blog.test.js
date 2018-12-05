import React from 'react'
import { mount } from 'enzyme'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'testblog',
    author: 'testman',
    likes: 3,
    user: {
      name: 'testadder'
    }
  }

  test('renders only title by default', () => {
    const blogComponent = mount(<Blog blog={blog} />)
    const titleSpan = blogComponent.find('span')
    const toggleContent = blogComponent.find('.toggleContent')

    expect(titleSpan.text()).toContain(`${blog.title} ${blog.author}`)
    expect(toggleContent.getElement().props.style).toEqual({ display: 'none', paddingLeft: '10px' })
  })

  test('renders everything after click', () => {
    const blogComponent = mount(<Blog blog={blog} />)
    const titleSpan = blogComponent.find('span')

    titleSpan.simulate('click')

    const toggleContent = blogComponent.find('.toggleContent')
    expect(toggleContent.getElement().props.style).toEqual({ display: '', paddingLeft: '10px' })
  })
})
