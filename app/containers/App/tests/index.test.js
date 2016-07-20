import expect from 'expect'
import { shallow, render } from 'enzyme'
import React from 'react'

import { App } from '../index'

describe('<App />', () => {
  it('should render the logo', () => {
    const renderedComponent = shallow(
      <App />
    )
    expect(renderedComponent.find('img').length).toEqual(1)
  })

  it('should render its children', () => {
    const children = (<h1>Test</h1>)
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    )
    expect(renderedComponent.contains(children)).toEqual(true)
  })

  it('should render an error if loading failed', () => {
    const renderedComponent = render(
      <App
        loading={false}
        errorMessage={'Error retrieving business list.'}
      />
    )
    expect(
      renderedComponent
        .text()
        .indexOf('Error retrieving business list.')
      ).toBeGreaterThan(-1)
  })
})
