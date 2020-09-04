import EventIcon from '../../components/Timeline/EventsBox/EventsIcon'
import Card from '../../components/Timeline/Card'
import React from 'react'
import { compose } from 'recompose';
import SeeMore from '../../components/AdvanceSearch/SeeMore'

const EventBox = ({t}) => {
    return (
        <Card title={'Events'}>
            <div className={"even-icon-group"}>
                <EventIcon/>
                <EventIcon/>
                <EventIcon/>
            </div>
            <div className={'btn-see-more'}>
                <SeeMore/>
            </div>
            <style jsx>{`
                .even-icon-group{
                    display:flex;
                }
                .btn-events-create{
                    transition: all .2s ease-in-out;
                    font-family: "Cloud";
                    color: #31a7d7;
                    cursor: pointer;
                    font-size: 12.8px;
                }

                .btn-events-create:hover{
                    transform: scale(1.02);
                }

                .btn-see-more{
                    margin-top: 2%;
                    height: 100%;
                }
            `}</style>
        </Card>
    )
}

export default compose(

)(EventBox)