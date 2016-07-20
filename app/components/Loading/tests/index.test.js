import expect from 'expect'
import { render } from 'enzyme'
import React from 'react'

import Loading from '../index'

describe('<Loading />', () => {
  it('should render', () => {
    const renderedComponent = render(
      <Loading />
    )

    expect(renderedComponent.find('span').length).toEqual(1)
  })
})
