import { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { getContacts } from './getContacts'

import * as constants from '../constants/contacts'

export function* sagas(): SagaIterator {
    yield all([
        takeLatest(constants.GET_CONTACTS, getContacts)
    ])
}
