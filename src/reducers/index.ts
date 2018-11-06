import { combineReducers } from 'redux'
import { routerReducer, RouterState } from 'react-router-redux'
import { ContactsState, contactsReducer } from './contacts'

export interface StoreState {
    contacts: ContactsState
    routing: RouterState
}

export const reducers = combineReducers<StoreState>({
    contacts: contactsReducer,
    routing: routerReducer
})
