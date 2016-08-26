import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { GoogleMap, GoogleMapLoader, Marker } from "react-google-maps";

import styles from './styles.css'

export class Map extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    }
  }

  componentDidMount() {
  	
  }

  handeMapClick(event) {

  }

  render() {
    return (
    <div className={styles.mapContainer}>
    </div>
  );
  }
}

function mapStateToProps(state) {
  const { items, page, loading } = state.list
  return {
    items,
    page,
    loading,
  }
}

export default connect(mapStateToProps)(Map);
