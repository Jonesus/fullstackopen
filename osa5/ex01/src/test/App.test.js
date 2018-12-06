import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
  test('renders only login if not logged in', () => {
    const app = mount(<App />)
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)

    const heading = app.find('h1')
    expect(heading.text()).toEqual('Log in to application')
  })

  test('renders blogs if logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    localStorage.setItem('user', JSON.stringify(user))

    const app = await mount(<App />)
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})
