import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classnames from 'classnames'

interface HeaderProps {
    title: string
    withBackBtn?: boolean
    saveChanges?: () => void
    onSearch?: any
    clearFilter?: () => void
}

interface HeaderStates {
    isSearch: boolean
}

export class Header extends React.Component<HeaderProps, HeaderStates> {

    constructor(props) {
        super(props)

        this.state = {
            isSearch: false
        }
    }

    searchInputTrigger = () => {
        this.setState({
            isSearch: !this.state.isSearch
        })

        this.props.clearFilter && this.props.clearFilter()
    }

    render() {
        return (
            <header className={
                classnames({
                    withBackBtn: this.props.withBackBtn,
                    withSaveBtn: this.props.saveChanges,
                    withFindBtn: this.props.onSearch
                })}
            >
                <h1>Contacts</h1>
                <h3>{this.props.title}</h3>

                <Link className="btn backBtn" to="/" />
                {
                    this.props.saveChanges &&
                        <div className="btn saveBtn" onClick={this.props.saveChanges} />
                }
                {
                    this.props.onSearch &&
                        <>
                            <div className="btn findBtn" onClick={this.searchInputTrigger} />
                            {
                                this.state.isSearch &&
                                <input type="text" onChange={(e) => this.props.onSearch(e)} className={
                                    classnames('searchInput', { active: this.state.isSearch } )
                                } />
                            }
                        </>
                }
            </header>
        )
    }

}