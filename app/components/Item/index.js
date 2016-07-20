import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './styles.css'

function formatPhone(phoneNumber) {
  const regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/
  if (regexObj.test(phoneNumber)) {
    const segments = phoneNumber.match(regexObj)
    const phone = (segments[1])
      ? `+1 (${segments[1]}) ${segments[2]}-${segments[3]}`
      : `${segments[2]}-${segments[3]}`
    return phone
  }
  return phoneNumber
}

function Item(props) {
  const { address, address2, city, country, id, name, phone,
    state, uuid, website, zip } = props.item

  const createdAt = Date(props.item.created_at)

  return (
    <div className={styles.item} key={id}>
      <h2><Link to={`/business/${id}`}>{name}</Link></h2>
      <span>{address} {address2}<br />
      {city}, {state} {zip} {country}<br />
      {formatPhone(phone)}</span>
      <span><a href={website} target="_new">{website}</a></span>
      <span className={styles.smaller}>id: {id} uuid: {uuid}</span>
      <span className={styles.smaller}>created: {createdAt}</span>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    state: PropTypes.string,
    uuid: PropTypes.string,
    website: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
}

export default Item
