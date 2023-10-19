'use client'
import { useEffect, useState } from "react"
import { useUnit } from "effector-react"
import Image from 'next/image'

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
import JoinedEvent from "./eventInfo/participationActions/JoinedEvent"

function Calendar({monthDays}) {
    const currentDate = useUnit(monthModel.$currentDate);
    const events = useUnit(eventsModel.$events);
    const userInfo = useUnit(modalAuth.$userInfo)

    const [eventInfoModal, additionalEvenInfoModal, callEventInfoModal, callAdditionalEvenInfoModal, controlModalBackground] = useUnit([
        modalControl.$eventInfoModal,
        modalControl.$additionalEvenInfoModal,
        modalControl.callEventInfoModal,
        modalControl.callAdditionalEvenInfoModal,
        modalControl.controlModalBackground
    ]);

    let [showedEvent, setShowedEvent] = useState('');
    let [isParticipant, setIsParticipant] =useState(false);
    let [isInitiator, setIsInitiator] =useState(false);

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

    let chekUserInitiator = (event) => {
        let initiator = false;

        if(event.owner) {
            if(event.owner.id === userInfo.id) {
                initiator = true;
            } else {
                initiator = false;
            }
        }

        return initiator;
    }

    useEffect(() => {
        setIsParticipant(checkUserParticipation(showedEvent));
        setIsInitiator(chekUserInitiator(showedEvent));
    }, [showedEvent])

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
                                                            let userPaticipant = checkUserParticipation(event);
                                                            let userInitiator = chekUserInitiator(event);
                                                            return (
                                                                <div 
                                                                    key={event.title}
                                                                    className={userInitiator? styles.eventInitiator : styles.event} 
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
                                                                        userInitiator?
                                                                            <Image src="/badge-initiator.svg" width={16} height={16} alt="initiator badge" />
                                                                        :
                                                                            userPaticipant? 
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
                                isInitiator={isInitiator}
                                isParticipant={isParticipant}
                            />
                        }
                        onClick={callEventInfoModal}
                    />

                :
                    <></>
            }
            {
                additionalEvenInfoModal?
                    <Modal
                        content={
                            <JoinedEvent
                                event={showedEvent}
                            />
                        } 
                        onClick={() => {
                            callAdditionalEvenInfoModal();
                            controlModalBackground(null);
                        }}
                    />
                :
                <></>
            }
        </div>
    )
}

export default Calendar;