import React from 'react'
import { connect } from 'react-redux'

import styles from './styles.css'

export class index extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="map-container">
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(index)
