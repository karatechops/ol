import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { resetErrorMessage, fetchList } from 'actions'

import 'sanitize.css/sanitize.css'
import styles from './styles.css'

import Logo from './logo.png'

export class App extends Component {
  constructor(props) {
    super(props)
    this.onDismissClick = this.onDismissClick.bind(this)
    this.onHomeClick = this.onHomeClick.bind(this)
  }

  onDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  onHomeClick() {
    this.props.fetchList(1)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: 'rgb(243, 92, 92)', color: '#fff', padding: '10px' }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#" onClick={this.onDismissClick}>Dismiss</a>)
      </p>
    )
  }

  render() {
    const { children } = this.props
    return (
      <div className={styles.container}>

        <header>
          <Link to="/" onClick={this.onHomeClick}>
            <img className={styles.logo} src={Logo} alt="OwnLocal" />
          </Link>
        </header>

        <div className={styles.content}>
          {this.renderErrorMessage()}
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  fetchList: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func,
  children: PropTypes.node,
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  fetchList,
})(App)
