import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'

import Button from '../index'

describe('<Button />', () => {
  it('should render a label', () => {
    const content = 'Click Me'

    const button = shallow(
      <Button>{content}</Button>
    )

    expect(button.text()).toEqual('Click Me')
  })

  it('should handle click events', () => {
    const onClickSpy = expect.createSpy()
    const renderedComponent = shallow(<Button onClick={onClickSpy} />)
    renderedComponent.find('span').simulate('click')
    expect(onClickSpy).toHaveBeenCalled()
  })
})
