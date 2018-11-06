import * as React from 'react'
import { bindActionCreators } from 'redux'
import { StoreState } from '../reducers'
import { connect, Dispatch } from 'react-redux'
import { ContactsActions, setContacts, SetContactsAction} from '../actions/contacts'
import {RouterAction, routerActions, RouterState} from 'react-router-redux'
import { ContactsState } from '../reducers/contacts'
import { Contact } from '../types/contact'
import { LINKS } from '../constants/links'
import { Header } from '../components/Header'

interface EditProps {
    contacts: ContactsState
    routing: RouterState
    routePush: (path: string) => RouterAction
    setContacts: (contacts: Array<Contact>) => SetContactsAction
}

interface EditStates {
    contactId: number,
    currentContact: any
}

export class Edit extends React.Component<EditProps, EditStates> {

    constructor(props) {
        super(props)

        this.state = {
            contactId: 0,
            currentContact: {}
        }
    }

    componentDidMount() {
        const id = parseInt(window.location.href.split('?id=')[1])
        this.setState({
            contactId: id,
            currentContact: this.props.contacts.contacts.find(
                    contact => (contact.id === id)
                )
        })
    }

    onChangeValue = (e) => {
        this.setState({
            currentContact: {
                ...this.state.currentContact,
                [e.target.name]: e.target.value
            }
        })
    }

    saveChanges = () => {
        let contacts = this.props.contacts.contacts
        let index = this.props.contacts.contacts.findIndex(
            contact => (contact.id === this.state.contactId)
        )
        contacts[index] = this.state.currentContact

        this.props.setContacts(
            contacts
        )

        this.props.routePush('/')
    }

    render() {
        return (
            <div>
                <Header title="Edit contact" withBackBtn={true} saveChanges={this.saveChanges} />

                <div className="contactEditDataContainer">
                    <div className="title">Personal data</div>
                    <label>
                        <span>Username</span>
                        <input type="text" name="username" value={this.state.currentContact.username || ''} onChange={(e) => this.onChangeValue(e)} />
                    </label>
                    <label>
                        <span>Name</span>
                        <input type="text" name="name" value={this.state.currentContact.name || ''} onChange={(e) => this.onChangeValue(e)} />
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="text" name="email" value={this.state.currentContact.email || ''} onChange={(e) => this.onChangeValue(e)} />
                    </label>
                    <label>
                        <span>Phone</span>
                        <input type="text" name="phone" value={this.state.currentContact.phone || ''} onChange={(e) => this.onChangeValue(e)} />
                    </label>
                    <label>
                        <span>Website</span>
                        <input type="text" name="website" value={this.state.currentContact.website || ''} onChange={(e) => this.onChangeValue(e)} />
                    </label>
                </div>

                {/*...and more...*/}

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

function mapDispatchToProps(dispatch: Dispatch<RouterAction |ContactsActions>) {
    return bindActionCreators(
        {
            routePush: routerActions.push,
            setContacts
        },
        dispatch
    )
}

export const EditContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)