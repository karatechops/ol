import React, { PropTypes } from 'react'

import Item from 'components/Item'

export default function List(props) {
  let list = props.items.map(item => <Item key={item.id} item={item} />)

  return (
    <div>
      {list}
    </div>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
}
