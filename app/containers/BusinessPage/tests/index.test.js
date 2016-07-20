import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as Actions from 'actions'
import nock from 'nock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('<BusinessPage />', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates ITEM_SUCCESS when fetching item has been done', () => {
    nock('http://ec2-54-84-251-148.compute-1.amazonaws.com')
      .get('/businesses/1')
      .reply(200, {
        id: 0,
        uuid: '2859d6e0-1cb9-4fe9-bc00-97823a9fa4cb',
        name: 'Yundt-Flatley',
        address: '1386 Lim Brooks',
        address2: 'Suite 517',
        city: 'Lake Betsy',
        state: 'IA',
        zip: '19416',
        country: 'US',
        phone: '4034880719',
        website: 'http://www.halvorson.com/',
        created_at: '2012-12-10T16:17:58.000Z' })

    const expectedActions = [
      { type: Actions.ITEM_REQUEST, id: 1 },
      { type: Actions.ITEM_SUCCESS, id: 1, response: {
        id: 0,
        uuid: '2859d6e0-1cb9-4fe9-bc00-97823a9fa4cb',
        name: 'Yundt-Flatley',
        address: '1386 Lim Brooks',
        address2: 'Suite 517',
        city: 'Lake Betsy',
        state: 'IA',
        zip: '19416',
        country: 'US',
        phone: '4034880719',
        website: 'http://www.halvorson.com/',
        created_at: '2012-12-10T16:17:58.000Z' },
      },
    ]

    const store = mockStore({ loading: false, item: null })

    return store.dispatch(Actions.fetchItem(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates ITEM_ERROR when fetching bad endpoint', () => {
    nock('http://ec2-54-84-251-148.compute-1.amazonaws.com')
      .get('/error')
      .reply(200, { error:
        'Endpoint not found. Available endpoints are: \'/businesses\' and \'/businesses/:id\'',
      })

    const expectedActions = [
      { type: Actions.ITEM_REQUEST, id: 1 },
      { type: Actions.ITEM_ERROR, error: 'Error retrieving business.' },
    ]
    const store = mockStore({ loading: false, item: null })

    return store.dispatch(Actions.fetchItem(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
