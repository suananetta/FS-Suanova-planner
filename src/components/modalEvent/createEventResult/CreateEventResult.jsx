'use client'
import { useUnit } from 'effector-react'

import moment from 'moment'
import "moment/locale/ru"

import { redcollar, ttcomons } from '@/app/fonts'
import styles from '../modalCreateEvent.module.scss'

import { model as modalModel } from '@/components/_store/modalControl'
import Button from '@/components/_shared/button/Button'
    
function CreateEventResult({status, eventTitle, eventStart, eventTime, eventLocation}) {
    const [eventModal, callEventModal] = useUnit ([
        modalModel.$eventModal,
        modalModel.callEventModal
    ]);

    const controlModalBackground = useUnit(modalModel.controlModalBackground);

    let eventDate = moment(eventStart);
    let eventWeekDay = eventDate.format('dddd');
    let eventDateStart = eventDate.format('DD MMMM');

    let septum = <div className={styles.septum}></div>

    return (
        <div className={redcollar.className}> 
            <div className={styles.eventResult}>
                <h2>{status === 200? 'Ура!' : 'Что-то пошло не так'}</h2>
                {
                    status === 200?
                    <>
                        <p>Вы добавили новое событие:</p>
                        <span>{eventTitle}</span>
                    </>
                    :
                    <span>Попробуйте позже</span>
                }
            </div>
            {
                status === 200?
                <>
                    <div className={styles.eventInfo}>
                        <div className={styles.eventDateInfo}>{eventWeekDay}{septum}{eventDateStart}{septum}{eventTime}</div>
                        <span className={ttcomons.className}>{eventLocation}</span>                    
                    </div>
                </>
                :
                <></>
            }
            <Button
                btnClass={styles.eventSuccessBtn}
                btnName={status === 200? 'Отлично' : 'Хорошо'}
                onClick = {() => {
                    callEventModal()
                    controlModalBackground(null);
                }}
            />    
        </div>
)
}
export default CreateEventResult;