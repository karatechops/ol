import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchList, augmentItemsWithGeo } from 'actions'

import Map from '../Map';

import List from 'components/List'
import Button from 'components/Button'
import Loading from 'components/Loading'

import styles from './styles.css'

export class BusinessListPage extends Component {
  constructor(props) {
    super(props)
    this.onNextClick = this.onNextClick.bind(this)
    this.onPrevClick = this.onPrevClick.bind(this)
  }

  componentWillMount() {
    const page = (this.props.params.page)
      ? this.props.params.page
      : 1
    this.props.dispatch(fetchList(page))
      //.then(augmentItemsWithGeo(this.props.items))
  }

  onNextClick() {
    this.props.dispatch(fetchList(this.props.page + 1))
    browserHistory.push(`/businesses/${this.props.page + 1}`)
  }

  onPrevClick() {
    this.props.dispatch(fetchList(this.props.page - 1))
    browserHistory.push(`/businesses/${this.props.page - 1}`)
  }

  render() {
    let list = (!this.props.loading)
      ? <List items={this.props.items} />
      : <Loading />

    let prev = (this.props.page > 1 && !this.props.loading)
      ? <Button onClick={this.onPrevClick}>Prev</Button>
      : null
    let next = (this.props.items.length > 0 && !this.props.loading)
      ? <Button onClick={this.onNextClick}>Next</Button>
      : null

    return (
      <div>
        <div>
          <Map />
        </div>
        <div>
          {list}
        </div>
        <div className={styles.controls}>
          {prev}
          {next}
        </div>
      </div>
    )
  }
}

BusinessListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array,
  page: PropTypes.number,
  loading: PropTypes.bool,
  params: PropTypes.shape({
    page: PropTypes.string,
  }),
}

function mapStateToProps(state) {
  const { items, page, loading } = state.list
  return {
    items,
    page,
    loading,
  }
}

export default connect(mapStateToProps)(BusinessListPage)
