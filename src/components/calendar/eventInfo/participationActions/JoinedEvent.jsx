'use client'

import { useUnit } from 'effector-react'

import moment from 'moment'
import "moment/locale/ru"

import { redcollar, ttcomons } from '@/app/fonts'
import styles from '../eventInfo.module.scss'

import { model as modalControl } from '@/components/_store/modalControl'
import Button from '@/components/_shared/button/Button'
    
function JoinedEvent({event}) {
    const [eventInfoModal, callAdditionalEvenInfoModal] = useUnit ([
        modalControl.$eventInfoModal,
        modalControl.callAdditionalEvenInfoModal
    ]);

    const controlModalBackground = useUnit(modalControl.controlModalBackground);

    let eventDate = moment(event.dateStart);
    let eventWeekDay = eventDate.format('dddd');
    let eventDateStart = eventDate.format('DD MMMM');

    let septum = <div className={styles.septum}></div>

    return (
        <div className={redcollar.className}> 
            <div className={styles.eventResult}>
                <h2>Поздравляем!</h2>
                
                <p>Вы теперь участник события:</p>
                <span>{event.title}</span>
            </div>
            <div className={styles.eventInfoModal}>
                <div className={styles.eventDateInfo}>{eventWeekDay}{septum}{eventDateStart}{septum}{eventDate.format('LT')}</div>
                <span className={ttcomons.className}>{event.location}</span>                    
            </div>
            <Button
                btnClass={styles.eventSuccessBtn}
                btnName={'Отлично'}
                onClick = {() => {
                    callAdditionalEvenInfoModal();
                    controlModalBackground(null);
                }}
            />    
        </div>
)
}
export default JoinedEvent;