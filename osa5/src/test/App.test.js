import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Note from '../components/Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders only login if not logged in', () => {
    app.update()
    const blogComponents = app.find(Note)
    expect(blogComponents.length).toEqual(0)

    const heading = app.find('h1')
    expect(heading.text()).toEqual('Log in to application')
  })
})
