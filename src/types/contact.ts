interface AccHistoryObj {
    account: string
    amount: string
    business: string
    date: string
    name: string
    type: string
}

interface Post {
    paragraph: string,
    sentence: string,
    sentences: string,
    words: Array<string>
}

export interface Contact {
    accountHistory: Array<AccHistoryObj>,
    address: {
        city: string
        country: string
        geo: {
            lat: string,
            lng: string
        }
        state: string
        streetA: string
        streetB?: string
        streetC?: string
        streetD?: string
        zipcode: string
    },
    avatar: string,
    company?: {
        name: string,
        catchPhrase: string,
        bs: string
    },
    email: string,
    favorite: boolean,
    id: number,
    name: string,
    phone: string,
    posts?: Array<Post>,
    username: string,
    website?: string
}