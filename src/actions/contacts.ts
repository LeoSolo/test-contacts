import * as constants from '../constants/contacts'
import { Contact } from '../types/contact'

export interface SetContactsAction {
    type: constants.SAVE_CONTACTS
    payload: {
        contacts: Array<Contact>
    }
}

export interface GetContactsAction {
    type: constants.GET_CONTACTS
}


export type ContactsActions = SetContactsAction & GetContactsAction

export function setContacts(contacts: Array<Contact>): SetContactsAction {
    return {
	    type: constants.SAVE_CONTACTS,
	    payload: {
            contacts: contacts
	    }
    }
}

export function getContacts(): GetContactsAction {
    return {
        type: constants.GET_CONTACTS
    }
}