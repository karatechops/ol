import React, { PropTypes } from 'react'

import styles from './styles.css'

export default function Button(props) {
  return (
    <span className={styles.button} onClick={props.onClick}>{props.children}</span>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
}
