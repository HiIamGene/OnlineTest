import React from 'react'
import NavBar from '../../components/Navbar/index'
import { AppLayout } from './app'
import "../../styles/style.scss"

const AdvanceSearchLayout = props => (
    <AppLayout>
        <NavBar/>
        <main className={'advance-search-container'}>
            {props.children}
        </main>
    </AppLayout>
)

export default AdvanceSearchLayout