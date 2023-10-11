'use client'
import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import { redcollar, ttcomons } from '@/app/fonts'
import styles from './modalCreateEvent.module.scss'

import { model as authModel } from '../_store/auth'
import { validateFile } from '../_utils/validation'
import { uploadFile } from '../_axios/requests'
import Button from '../_shared/button/Button'
import ParticipantComponent from './participantComponent/participantComponent'

function ModalCreateEvent({setModalOpened, setToken}) {
    const [userName, getAllUsersFx] = useUnit([
        authModel.$userName,
        authModel.getAllUsersFx
    ])
    
    let [allUsers, setAllUsers] = useState([]);

    let [eventTitle, setEventTitle] = useState('');
    let [eventDescription, setEventDescription] = useState('');
    let [eventParticipants, setEventParticipants] = useState([]);
    let [eventLocation, setEventLocation] = useState('');

    let [showUsersList, setShowUsersList] = useState(false);
    let [drag, setDrag] = useState(false)

    let [errorFile, setErroeFile] = useState('')

    let getUsersArray = async() => {
        let res = await getAllUsersFx();
        setAllUsers(res);
    } 

    console.log(allUsers);
    console.log(eventParticipants);

    let uploadPhotos = async(e) => {
        let error = validateFile(e);
        let files = [...e.target.files];
        let formData = new FormData();

        if(!error.error) {
            formData.append('photos', files[0]);
            console.log(formData);
            console.log(files);
            let res = await uploadFile(formData);
            console.log(res);
        } else {
            setErroeFile(error)
        }
    
    }

    useEffect(() => {
        getUsersArray()
    }, [])

    let addParticipant = (e) => {
        let participant;

        allUsers.map((user) => {
            if(user.id === +e.target.dataset.id) participant = user;
        });

        setEventParticipants([...eventParticipants, participant]);
        setAllUsers(allUsers.filter((user) => user.id !== +e.target.dataset.id))
    }

    let removeParticipant = (e) => {
        let users = eventParticipants.filter((user) => user.id === +e.target.dataset.id);
        setAllUsers([...allUsers, ...users])
        setEventParticipants(eventParticipants.filter((user) => user.id !== +e.target.dataset.id))
    }

    let dragHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    let dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    let dropHandler = (e) => {
        e.preventDefault();
        console.log(e);
        let files = [...e.dataTransfer.files];
        console.log(files);
        setDrag(false);
    }

    let required = <span className={styles.required}>*</span>

    return (
        
        <div className={styles.modalCreateEvent}>

            <h2 className={redcollar.className}>Создание события</h2>
            <div className={styles.eventForm}>

                <div className={styles.eventDescriptionInfo}>

                    <div className={styles.eventInfoItem}>
                        <input className={ttcomons.className} type='text' id='eventTitle' maxLength={140} onChange={(e) => {setEventTitle(e.target.value)}} required/>
                        <label className={styles.eventLable} htmlFor='eventTitle'>Название{required}</label>
                    </div>

                    <div className={styles.eventInfoItem}>
                        <textarea 
                            className={ttcomons.className} 
                            id='eventDescription' 
                            maxLength={1000} 
                            onChange={(e) => {setEventDescription(e.target.value)}} 
                            required
                        />
                        <label className={styles.eventLable} htmlFor='eventDescription'>Описание{required}</label>
                    </div>

                    <div className={styles.eventInfoItem}>
                        {
                            eventParticipants.length > 0?
                            <div className={styles.participatorsInfoItem}>
                                <input 
                                    className={ttcomons.className} 
                                    readOnly
                                    id='eventPartisipants' 
                                    onFocus={() => setShowUsersList(!showUsersList)} 
                                />
                                <label className={styles.participatorsLable} htmlFor='eventPartisipants'>Участники</label>
                            </div>
                            :
                            <>
                                <input 
                                    className={ttcomons.className} 
                                    type='text' 
                                    id='eventPartisipants' 
                                    onFocus={() => setShowUsersList(!showUsersList)} 
                                />
                                <label className={styles.eventLable} htmlFor='eventPartisipants'>Участники</label>
                            </>
                        }
                            <ParticipantComponent
                                arr={eventParticipants}
                                chosen={true}
                                remove={(e) => removeParticipant(e)}
                            />
                        {
                            showUsersList?
                                <ParticipantComponent
                                    arr={allUsers}
                                    chosen={false}
                                    add={(e) => {addParticipant(e)}}
                                />
                            :
                                <></>
                        }
                    </div>

                    <div className={styles.filesInfoItem}>
                        <input 
                            className={styles.eventFiles} 
                            type='file' 
                            accept=".jpg,.jpeg,.png" 
                            id='eventFiles' 
                            onClick={e => console.log(e.target)} 
                            onDragStart={(e) => {dragHandler(e)}}
                            onDragOver={(e) => {dragHandler(e)}}
                            onDragLeave={(e) => {dragLeaveHandler(e)}}
                            onDrop={(e) => {dropHandler(e)}}
                            onChange={(e) =>{
                                uploadPhotos(e);
                            }}
                            multiple
                        />
                        <label className={styles.eventFilesLable} htmlFor='eventFiles'>
                            {
                                drag?
                                    'Отпустите файлы для загрузки'
                                    :
                                    'Выберите фото или перетащите сюда'
                            }
                        </label>
                    </div>
                </div>

                <div className={styles.eventOrgInfo}>

                    <div className={styles.eventDates}>
                        <div className={styles.startDate}>
                            <input className={styles.eventName} type='date' id='startDate' required/>
                            <label className={styles.labelStartDate} htmlFor='startDate'>Начало{required}</label>
                        </div>
                        <div className={styles.endDate}>
                            <input className={styles.eventName} type='date' id='endDate'/>
                            <label className={styles.labelEndDate} htmlFor='endDate'>Конец</label>
                        </div>
                    </div>

                    <div className={styles.eventTime}>
                        <input className={styles.eventName} type='time' id='time' required/>
                        <label className={styles.labelTime} htmlFor='time'>Время{required}</label>
                    </div>

                    <div className={styles.eventLocation}>
                        <input className={styles.eventName} type='text' id='location' maxLength={140}/>
                        <label className={styles.labelLocation} htmlFor='location'>Место проведения{required}</label>
                    </div>

                    <div className={styles.eventInitiator}>
                        <div className={styles.userAvatar} style={{backgroundImage: `url(${'/user-head.png'})`}}></div>
                        <div className={styles.initiatorName}>
                            {userName}
                            <span>Организатор</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ModalCreateEvent;