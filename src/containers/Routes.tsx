import * as React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'

import { AppContainer } from './App'
import { EditContainer } from './Edit'

import { LINKS } from '../constants/links'

import { RouterState } from 'react-router-redux'
import { StoreState } from "../reducers"
import { connect, Dispatch } from "react-redux"

interface RoutesProps {
    routing: RouterState
}

export class Routes extends React.Component<RoutesProps> {

    constructor(props) {
        super(props)
    }

    render() {

        return (
			<React.Fragment>
                <section className="main">
                    <Switch>
                        <Route
                            exact={true}
                            path={LINKS.MAIN}
                            component={AppContainer}
                        />
                        <Route
                            exact={true}
                            path={LINKS.EDIT}
                            component={EditContainer}
                        />
                    </Switch>
                </section>
			</React.Fragment>
        )
    }
}

function mapStateToProps(state: StoreState) {
    return {
        routing: state.routing
    }
}

export const RoutesContainer = connect(
    mapStateToProps
)(Routes)
