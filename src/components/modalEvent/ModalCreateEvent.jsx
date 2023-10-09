'use client'

import { redcollar, ttcomons } from '@/app/fonts'
import styles from './modalCreateEvent.module.scss'
import Image from 'next/image'

function ModalCreateEvent({setModalOpened, setToken}) {
    let required = <span className={styles.required}>*</span>
    return (
        
        <div className={styles.modalCreateEvent}>

            <h2 className={redcollar.className}>Создание события</h2>

            <div className={styles.eventForm}>

                <div className={styles.eventDescriptionInfo}>

                    <div className={styles.eventInfoItem}>
                        <input className={ttcomons.className} type='text' id='eventTitle'/>
                        <label className={styles.eventLable} htmlFor='eventTitle'>Название{required}</label>
                    </div>

                    <div className={styles.eventInfoItem}>
                        <input className={ttcomons.className} type='text' id='eventDescription'/>
                        <label className={styles.eventLable} htmlFor='eventDescription'>Описание{required}</label>
                    </div>

                    <div className={styles.selectInfoItem}>
                        <select name="" id="" className={ttcomons.className}></select>
                        <label className={styles.selectLable} htmlFor='eventParticipators'>Участники</label>
                    </div>

                    <div className={styles.filesInfoItem}>
                        <input className={styles.eventFiles} type='file' id='eventFiles'/>
                        <label className={styles.eventFilesLable} htmlFor='eventFiles'>Выберите фото или перетащите сюда</label>
                    </div>
                </div>

                <div className={styles.eventOrgInfo}>

                    <div className={styles.eventDates}>
                        <div className={styles.startDate}>
                            <input className={styles.eventName} type='date' id='startDate'/>
                            <label className={styles.labelStartDate} htmlFor='startDate'>Начало{required}</label>
                        </div>
                        <div className={styles.endDate}>
                            <input className={styles.eventName} type='date' id='endDate'/>
                            <label className={styles.labelEndDate} htmlFor='endDate'>Конец</label>
                        </div>
                    </div>

                    <div className={styles.eventTime}>
                        <input className={styles.eventName} type='time' id='time'/>
                        <label className={styles.labelTime} htmlFor='time'>Время{required}</label>
                    </div>

                    <div className={styles.eventLocation}>
                        <input className={styles.eventName} type='text' id='time'/>
                        <label className={styles.labelLocation} htmlFor='time'>Место проведения{required}</label>
                    </div>

                    <div className={styles.eventInitiator}>
                        <div className={styles.userAvatar} style={{backgroundImage: `url(${'/user-head.png'})`}}></div>
                        <div className={styles.initiatorName}>
                            Имя
                            <span>Организатор</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ModalCreateEvent;