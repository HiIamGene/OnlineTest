import React from 'react';
import Navbar from "../../components/Navbar/index"
import "../../styles/style.scss"
import {AppLayout} from "./app"
import Header from "../../components/Timeline/Header"



const TimelineLayout = props => (
    <AppLayout>
        <Navbar/>
        <main className={"timeline-container"}>
            <Header anotherProfile={props.profile}/>
                {props.children}
        </main>
    </AppLayout>
);

export default TimelineLayout;