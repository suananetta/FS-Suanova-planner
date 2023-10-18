'use client'

import { useUnit } from "effector-react"

import moment from "moment"
import "moment/locale/ru"

import { redcollar, ttcomons } from '@/app/fonts'
import styles from './calendar.module.scss'

import { model as monthModel } from '../_store/dateControl'
import { model as eventsModel } from "../_store/events"
import { model as modalControl} from "../_store/modalControl"
import { model as modalAuth } from "../_store/auth"
import { weekDays, colors } from "../_utils/utils"
import Modal from "../_shared/modal/Modal"
import EventInfo from "./eventInfo/EventInfo"
import { useEffect, useState } from "react"

function Calendar({monthDays}) {
    const currentDate = useUnit(monthModel.$currentDate);
    const events = useUnit(eventsModel.$events);
    const userInfo = useUnit(modalAuth.$userInfo)
    console.log(userInfo);
    const [eventInfoModal, callEventInfoModal] = useUnit([
        modalControl.$eventInfoModal,
        modalControl.callEventInfoModal,
    ]);

    let [showedEvent, setShowedEvent] = useState('');

    let checkUserParticipation = (event) => {
        let participation = false;

        if(event.participants) {
            event.participants.map((participant) => {
                if(participant.id === userInfo.id) {
                    participation = true;
                }
            })
        }
        return participation;
    }

    useEffect(() => {
        
    })

    return (
        <div className={ttcomons.className}>
            <div className={redcollar.className}>
            <div className={styles.dayNames}>
                {
                    weekDays.map((day) => {
                        return (
                            <div key={day} className={styles.dayName} >
                                {day}
                            </div>
                        )
                    })
                }
            </div>
            </div>
            <div className={styles.cells}>
                {
                    monthDays.map((day) => {
                        let color;
                        let currentMonth = currentDate.month();

                        if(day.month() !== currentMonth) {
                            color = colors.darkGray;
                        } else {
                            color = colors.mainBlack;
                        }

                        return (
                            <div key={day.format()} className={styles.cell} style={{color: `${color}`}}>
                                <span>{day.format('D')} {day.format('D') === '1'? day.format('MMM') : ''}</span>
                                {
                                    events.length > 0? 
                                        <div className={styles.events}>  
                                            {   
                                                events
                                                    .sort((a,b) => moment(a.dateStart)-moment(b.dateStart))
                                                    .map((event) => {
                                                        if(moment(event.dateStart).format('DD-MM-YYYY') === day.format('DD-MM-YYYY')) {
                                                            let userPaticipation = checkUserParticipation(event);
                                                            console.log(userPaticipation);
                                                            return (
                                                                <div 
                                                                    key={event.title}
                                                                    className={styles.event} 
                                                                    style={{
                                                                        opacity: `${day < moment()? 0.4 : 1 }`
                                                                    }}
                                                                    data-event={JSON.stringify(event)} 
                                                                    onClick={(e) => {
                                                                        setShowedEvent(JSON.parse(e.target.dataset.event))
                                                                        callEventInfoModal();
                                                                    }} 
                                                                >
                                                                    {
                                                                        userPaticipation? 
                                                                        <div className={styles.userPaticipant}></div>
                                                                        :
                                                                        <></>
                                                                    }
                                                                    {event.title}
                                                                </div>
                                                            )
                                                        }
                                                    })
                                            }
                                        </div>
                                    :
                                        <></>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                eventInfoModal?
                    <Modal
                        content={
                            <EventInfo 
                                event={showedEvent}
                                relevant={moment(showedEvent.dateStart) < moment()? false : true}
                            />
                        }
                        onClick={callEventInfoModal}
                    />

                :
                    <></>
            }
        </div>
    )
}

export default Calendar;