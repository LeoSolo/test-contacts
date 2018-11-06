import { ContactsActions } from '../actions/contacts'
import * as constants from '../constants/contacts'
import { Contact } from '../types/contact'

export interface ContactsState {
	contacts: Array<Contact>
}

const initialState: ContactsState = {
    contacts: []
}

export function contactsReducer(state: ContactsState = initialState, action: ContactsActions): ContactsState {
	switch (action.type) {
		case constants.SAVE_CONTACTS:
			const { contacts } = action.payload
			return {
                contacts
			}
		default:
            return state
	}
}
