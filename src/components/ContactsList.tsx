import * as React from 'react'

import { Contact } from '../types/contact'


interface ContactsListProps {
    contactsArray: Array<Contact>
    route: any
}

export class ContactsList extends React.Component<ContactsListProps> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="contactsList">
                {
                    this.props.contactsArray.map((item: Contact, index) => {
                        let avatarStyle: object = {
                            backgroundImage: 'url(' + item.avatar + ')',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }

                        return (
                            <li key={index}>
                                <div className="avatar" style={avatarStyle} />
                                <div className="description">
                                    <span className="name">{item.name}</span>
                                    <span>{item.phone}</span>
                                    <span>{item.email}</span>
                                </div>
                                <div className="btn editBtn" onClick={() => this.props.route(item.id)} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

}
