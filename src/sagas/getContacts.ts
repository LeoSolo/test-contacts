import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Contact } from '../types/contact'

import { setContacts } from '../actions/contacts'

export function* getContacts(): SagaIterator {
    try {
        const response = yield call(fetch, 'http://demo.sibers.com/users', { method: 'GET' })
        const result: Array<Contact> = yield call([response, response.json])
        sortContacts(result)
        yield put(setContacts(result))
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

function sortContacts(result) {
    result.sort((a, b) => {
        if( a.name < b.name ){
            return -1;
        }else if( a.name > b.name ){
            return 1;
        }
        return 0;

    })
}
