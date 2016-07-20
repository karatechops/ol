import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const initialState = {
  loading: true,
  page: 1,
  items: [],
}

function list(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
      break
    case ActionTypes.LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        items: action.response.businesses,
        page: Number(action.page),
      })
      break
    case ActionTypes.LIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
      })
      break
    default:
      return state
  }
}

const itemInitialState = {
  item: null,
  loading: false,
}

function item(state = itemInitialState, action) {
  switch (action.type) {
    case ActionTypes.ITEM_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      })
      break
    case ActionTypes.ITEM_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        item: action.response,
      })
      break
    case ActionTypes.ITEM_ERROR:
      return Object.assign({}, state, {
        loading: false,
      })
      break
    default:
      return state
  }
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  errorMessage,
  list,
  item,
  routing,
})

export default rootReducer
