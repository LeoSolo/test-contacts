import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RouterState } from 'react-router-redux'
import { RouterAction, routerActions } from 'react-router-redux'

import { StoreState } from '../reducers'
import { ContactsState } from '../reducers/contacts'
import { ContactsActions, getContacts, GetContactsAction } from '../actions/contacts'
import { Contact } from '../types/contact'

import { ContactsList } from '../components/ContactsList'
import { LINKS } from '../constants/links'
import { Header } from '../components/Header'

interface AppProps {
	contacts: ContactsState
	routing: RouterState
    routePush: (path: string) => RouterAction
    getContacts: () => GetContactsAction
}

interface AppStates {
	contacts: Array<Contact>
	filter: string
}

export class App extends React.Component<AppProps, AppStates> {

	constructor(props) {
		super(props)

		this.state = {
			contacts: props.contacts.contacts,
			filter: ''
		}
	}

	componentDidMount() {
        this.props.contacts.contacts.length === 0 && this.props.getContacts()
	}

	static areArraysEqual(arr1, arr2) {
		return JSON.stringify(arr1) === JSON.stringify(arr2)
	}

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!App.areArraysEqual(nextProps.contacts.contacts, prevState.contacts)) {
            return {
                contacts: nextProps.contacts.contacts
            }
        }

        return null
	}

	editRoute = (id) => {
        this.props.routePush(LINKS.EDIT + `?id=${id}`)
	}

	onSearch = (e) => {
		let value = e.target.value.toLowerCase()

		this.setState({
            filter: value
		})
	}

	clearFilter = () => {
        this.setState({
            filter: ''
        })
	}

	render() {
		let filteredContactsList = this.state.contacts.filter((contact) => {
            return this.state.filter.length > 0 ? contact.name.toLowerCase().includes(this.state.filter) : true
		})

		return (
			<div>
				<Header title="Link" onSearch={this.onSearch} clearFilter={this.clearFilter} />
				<ContactsList contactsArray={filteredContactsList} route={this.editRoute} />
			</div>
		)
	}
}

function mapStateToProps(state: StoreState) {
	return {
        contacts: state.contacts,
		routing: state.routing
	}
}

function mapDispatchToProps(dispatch: Dispatch<RouterAction | ContactsActions>) {
	return bindActionCreators(
		{
            routePush: routerActions.push,
			getContacts
		},
		dispatch
	)
}

export const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
