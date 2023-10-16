'use client'
import { useState } from "react"

import moment from "moment"
import "moment/locale/ru"

import styles from '../modalCreateEvent.module.scss'

import MiniCalendar from "./miniCalendar/MiniCalendar"

function EventDates({eventStart, setEventStart, eventEnd, setEventEnd, required}) {
    let [showCalendarStart, setShowCalendarStart] =  useState(false);
    let [showCalendarEnd, setShowCalendarEnd] = useState(false);
    
    return (
        <>
            <div className={styles.eventDate}>
                <input 
                    className={styles.startDate} 
                    type='text' 
                    id='startDate' 
                    placeholder='дд.мм.гггг' 
                    value={eventStart? moment(eventStart).format('DD.MM.YYYY') : ''}
                    onClick={() => {
                        setShowCalendarStart(!showCalendarStart);
                        setShowCalendarEnd(false);
                    }}
                    required 
                    readOnly 
                />
                <label className={styles.labelStartDate} htmlFor='startDate'>Начало{required}</label>
            </div>
            <div className={styles.eventDate}>
                <input 
                    className={styles.endDate} 
                    type='text' 
                    id='endDate' 
                    placeholder='дд.мм.гггг'
                    value={eventEnd? moment(eventEnd).format('DD.MM.YYYY') : ''}
                    onClick={() => {
                        setShowCalendarEnd(!showCalendarEnd);
                        setShowCalendarStart(false);
                    }}
                    readOnly
                />
                <label className={styles.labelEndDate} htmlFor='endDate'>Конец</label>
            </div>
            {
                showCalendarStart || showCalendarEnd?
                    <MiniCalendar 
                        showCalendar={showCalendarStart? setShowCalendarStart : setShowCalendarEnd}
                        setDate={showCalendarStart? setEventStart : setEventEnd}
                    />
                :
                <></>
            }
        </>
    )
}

export default EventDates;