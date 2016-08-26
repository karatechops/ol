import fetch from 'isomorphic-fetch'

export const LIST_REQUEST = 'LIST_REQUEST'
export const LIST_SUCCESS = 'LIST_SUCCESS'
export const LIST_ERROR = 'LIST_ERROR'

export function listRequestSuccess(page, direction, response) {
  return dispatch => {
    dispatch({ response, direction, page, type: LIST_SUCCESS })
  }
}

export function listRequest(page) {
  return {
    type: LIST_REQUEST,
    page,
  }
}

export function fetchList(page, direction = null) {
  return dispatch => {
    dispatch(listRequest(page))
    return fetch(`http://ec2-54-84-251-148.compute-1.amazonaws.com/businesses?per_page=10&page=${page}`)
      .then(response => response.json())
      .then(json => dispatch(listRequestSuccess(page, direction, json)))
      .catch(error => dispatch({ // eslint-disable-line no-unused-vars
        type: LIST_ERROR,
        error: 'Error retrieving business list.',
      }))
  }
}

export const ITEM_REQUEST = 'ITEM_REQUEST'
export const ITEM_SUCCESS = 'ITEM_SUCCESS'
export const ITEM_ERROR = 'ITEM_ERROR'

export function itemRequestSuccess(id, response) {
  return dispatch => {
    dispatch({ response, id, type: ITEM_SUCCESS })
  }
}

export function itemRequest(id) {
  return {
    type: ITEM_REQUEST,
    id,
  }
}

export function fetchItem(id) {
  return dispatch => {
    dispatch(itemRequest(id))
    return fetch(`http://ec2-54-84-251-148.compute-1.amazonaws.com/businesses/${id}`)
      .then(response => response.json())
      .then(json => dispatch(itemRequestSuccess(id, json)))
      .catch(error => dispatch({ // eslint-disable-line no-unused-vars
        type: ITEM_ERROR,
        error: 'Error retrieving business.',
      }))
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE,
  }
}

export function augmentItemsWithGeo(items) {
  var geoCodeUrlTemplate = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
  return Promise.all(items.map(augmentItemWithGeo));

  function augmentItemWithGeo(item) {
    return fetch(geoCodeUrlTemplate + item.zip) // TODO: is it .zip or .zipcode or what?
      .then(response => response.json())
      .then(responseJson => responseJson.results[0].geometry.location)
      .then(location => Object.assign({}, item, {geo:location}))
      //.catch(error => dispatch({ // eslint-disable-line no-unused-vars
      //  type: ITEM_ERROR,
      //  error: 'Error retrieving business.',
      //}))
  }
}
