import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as Actions from 'actions'
import nock from 'nock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('<BusinessListPage />', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates LIST_SUCCESS when fetching list has been done', () => {
    nock('http://ec2-54-84-251-148.compute-1.amazonaws.com')
      .get('/businesses?per_page=10&page=1')
      .reply(200, { businesses: [{ id: 0, uuid: '2859d6e0-1cb9-4fe9-bc00-97823a9fa4cb', name: 'Yundt-Flatley', address: '1386 Lim Brooks', address2: 'Suite 517', city: 'Lake Betsy', state: 'IA', zip: '19416', country: 'US', phone: '4034880719', website: 'http://www.halvorson.com/', created_at: '2012-12-10T16:17:58.000Z' }, { id: 1, uuid: 'd083169c-4340-4a07-b390-07d297823efd', name: 'Botsford Ltd', address: '74883 Hane Prairie', address2: null, city: 'Margrettburgh', state: 'KS', zip: '99840', country: 'US', phone: '2462288476', website: 'http://bergstrom.org/', created_at: '2013-11-19T23:26:13.000Z' }], pages: { last: 'http://ec2-54-84-251-148.compute-1.amazonaws.com/businesses?page=25000\u0026per_page=2', next: 'http://ec2-54-84-251-148.compute-1.amazonaws.com/businesses?page=2\u0026per_page=2' } })

    const expectedActions = [
      { type: Actions.LIST_REQUEST, page: 1 },
      { type: Actions.LIST_SUCCESS, page: 1, direction: null, response: { businesses: [{ id: 0, uuid: '2859d6e0-1cb9-4fe9-bc00-97823a9fa4cb', name: 'Yundt-Flatley', address: '1386 Lim Brooks', address2: 'Suite 517', city: 'Lake Betsy', state: 'IA', zip: '19416', country: 'US', phone: '4034880719', website: 'http://www.halvorson.com/', created_at: '2012-12-10T16:17:58.000Z' }, { id: 1, uuid: 'd083169c-4340-4a07-b390-07d297823efd', name: 'Botsford Ltd', address: '74883 Hane Prairie', address2: null, city: 'Margrettburgh', state: 'KS', zip: '99840', country: 'US', phone: '2462288476', website: 'http://bergstrom.org/', created_at: '2013-11-19T23:26:13.000Z' }], pages: { last: 'http://ec2-54-84-251-148.compute-1.amazonaws.com/businesses?page=25000\u0026per_page=2', next: 'http://ec2-54-84-251-148.compute-1.amazonaws.com/businesses?page=2\u0026per_page=2' } } },
    ]
    const store = mockStore({ loading: true, page: 1, items: [] })

    return store.dispatch(Actions.fetchList(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates LIST_ERROR when fetching bad endpoint', () => {
    nock('http://ec2-54-84-251-148.compute-1.amazonaws.com')
      .get('/error')
      .reply(200, { error:
        'Endpoint not found. Available endpoints are: \'/businesses\' and \'/businesses/:id\'',
      })

    const expectedActions = [
      { type: Actions.LIST_REQUEST, page: 1 },
      { type: Actions.LIST_ERROR, error: 'Error retrieving business list.' },
    ]
    const store = mockStore({ loading: true, page: 1, items: [] })

    return store.dispatch(Actions.fetchList(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
