import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { fetchItem } from 'actions'

import Item from 'components/Item'
import Loading from 'components/Loading'

class BusinessPage extends Component {
  componentWillMount() {
    const id = (this.props.params.id)
      ? this.props.params.id
      : 1
    this.props.dispatch(fetchItem(id))
  }

  render() {
    let content = (!this.props.loading && this.props.item !== null)
      ? <Item item={this.props.item} />
      : <Loading />

    return (
      <div>{content}</div>
    )
  }
}

BusinessPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object,
  loading: PropTypes.bool,
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
}

function mapStateToProps(state) {
  const { item, loading } = state.item
  return {
    item,
    loading,
  }
}

export default connect(mapStateToProps)(BusinessPage)
