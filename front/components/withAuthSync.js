import { Component } from 'react'
import Router from 'next/router'

export function withAuthSync(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)

            this.syncLogout = this.syncLogout.bind(this)
        }
        componentDidMount() {
            window.addEventListener('storage', this.syncLogout)
        }

        componentWillUnmount() {
            window.removeEventListener('storage', this.syncLogout)
            window.localStorage.removeItem('logout')
        }

        syncLogout(event) {
            if (event.key === 'logout') {
                // console.log('logged out from storage!')
                Router.push('/login')
            }
        }

        render() {
            return <WrappedComponent { ...this.props}/>
        }
    }
}