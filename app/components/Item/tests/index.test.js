import expect from 'expect'
import { render } from 'enzyme'
import React from 'react'

import Item from '../index'

describe('<Item />', () => {
  it('should render a title', () => {
    const content = {
      id: 1,
      uuid: 'd083169c-4340-4a07-b390-07d297823efd',
      name: 'Botsford Ltd',
      address: '74883 Hane Prairie',
      address2: null,
      city: 'Margrettburgh',
      state: 'KS',
      zip: '99840',
      country: 'US',
      phone: '2462288476',
      website: 'http://bergstrom.org/',
      created_at: '2013-11-19T23:26:13.000Z',
    }

    const item = render(
      <Item item={content} />
    )

    expect(item.find('h2').text()).toEqual('Botsford Ltd')
  })
})
