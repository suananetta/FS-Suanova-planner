'use client'
import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import moment from "moment"
import "moment/locale/ru"

import { redcollar, ttcomons } from '@/app/fonts'
import styles from './modalCreateEvent.module.scss'

import { model as authModel } from '../_store/auth'
import { model as dateModel } from '../_store/dateControl'
import { validateFile } from '../_utils/validation'
import { createNewEvent, uploadFile } from '../_axios/requests'

import Button from '../_shared/button/Button'
import Participants from './participants/Participants'
import FileUploader from './fileUploader/FileUploader'
import FileUploaderPreview from './fileUploader/FileUploaderPreview'
import EventDates from './eventDates/EventDates'

function ModalCreateEvent({setModalOpened, setToken}) {
    const [userName, getAllUsersFx, getUserInfo, getUserName] = useUnit([
        authModel.$userName,
        authModel.getAllUsersFx,
        authModel.getUserInfoFx,
        authModel.getUserName
    ]);

    let [allUsers, setAllUsers] = useState([]);

    let [eventTitle, setEventTitle] = useState('');
    let [eventDescription, setEventDescription] = useState('');
    let [eventParticipants, setEventParticipants] = useState([]);
    let [eventTime, setEventTime] = useState('');
    let [eventLocation, setEventLocation] = useState('');
    let [eventPhotos, setEventPhotos] = useState([]);
    let [eventStart, setEventStart] = useState('');
    let [eventEnd, setEventEnd] = useState('');
console.log(eventPhotos);
    let [showUsersList, setShowUsersList] = useState(false);

    let [errorFile, setErrorFile] = useState('')

    let getUsersArray = async() => {
        let res = await getAllUsersFx();
        setAllUsers(res);
    } 

    let getUser = async() => {
        let name = await getUserInfo();
        getUserName(name);
    }

    let uploadFiles = (files) => {
        let formData = new FormData();
        let uploadedFiles = [];

        Array.from(files).forEach((file) => {
            formData.append('files', file);         
        })

        formData.getAll('files').forEach((file) => {
            uploadFile(file).then(res => uploadedFiles.push(res.data[0].id))
        });

        return uploadedFiles;
    }

    useEffect(() => {
        getUsersArray();
        getUser();
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

    let addPhotos = (files) => {
        // let formData = new FormData();
        let errors = validateFile(files);

        Array.from(files).map((file) => {
            if(errors.length > 0) {
                errors.map((error) => {
                    setEventPhotos([...eventPhotos, ...files.filter((file) => file.name !== error.fileName)]);
                })
            } else {
                // formData.append('files', file);
                setEventPhotos([...eventPhotos, ...files]);
            }            
        })

        setErrorFile(errors);

        // formData.getAll('files').forEach((file) => {
        //     uploadFile(file).then(res => setEventPhotos([...eventPhotos, ...res.data]));           
        // });
    }

    let removePhoto = (e) => {   
        let arr = [...eventPhotos.filter((photo) => photo.name !== e.target.dataset.id)];
        setEventPhotos(arr);
    }

    let submitEvent = async() => {
        let partisipantsIDs = [];

        eventParticipants.map((participant) => {
            partisipantsIDs.push(participant.id)
        })

        let photos = uploadFiles(eventPhotos);

        let eventData = {
            "data": {
              "dateStart": eventStart,
              "title": eventTitle,
              "description": eventDescription,
              "photos": photos,
              "location": eventLocation,
              "dateEnd": eventEnd,
              "participants": partisipantsIDs,
              "owner": userName
            }
        }

        let res = await createNewEvent(eventData);
        console.log(eventData);
    }

    let required = <span className={styles.required}>*</span>

    return (
        <div className={styles.modalCreateEvent}>

            <h2 className={redcollar.className}>Создание события</h2>
            <form className={styles.eventForm}>
                <div className={styles.eventDescriptionInfo}>

                    <div className={styles.eventInfoItem}>
                        <input className={ttcomons.className} type='text' id='eventTitle' maxLength={140} onChange={(e) => {setEventTitle(e.target.value)}} placeholder='' required/>
                        <label className={styles.eventLable} htmlFor='eventTitle'>Название{required}</label>
                    </div>

                    <div className={styles.eventInfoItem}>
                        <textarea 
                            className={ttcomons.className} 
                            id='eventDescription' 
                            maxLength={1000} 
                            placeholder=''
                            onChange={(e) => {setEventDescription(e.target.value)}} 
                            required
                        />
                        <label className={styles.eventLable} htmlFor='eventDescription'>Описание{required}</label>
                    </div>

                    <div className={styles.eventInfoItem}>
                        <Participants
                            allUsers={allUsers}
                            eventParticipants={eventParticipants}
                            showUsersList={showUsersList}
                            setShowUsersList={setShowUsersList}
                            removeParticipant={removeParticipant}
                            addParticipant={addParticipant}
                        />
                    </div>
                    
                    <FileUploader addPhotos={addPhotos} errors={errorFile}/>
                </div>

                <div className={styles.eventOrgInfo}>

                    <div className={styles.eventDates}>
                        <EventDates
                            eventStart={eventStart}
                            setEventStart={setEventStart}
                            eventEnd={eventEnd}
                            setEventEnd={setEventEnd}
                            required={required}
                        />
                    </div>

                    <div className={styles.eventTime}>
                        <input className={styles.eventName} type='time' id='time' onClick={(e) => setEventTime(e.target.value)} required/>
                        <label className={styles.labelTime} htmlFor='time'>Время{required}</label>
                    </div>

                    <div className={styles.eventInfoItem}>
                        <input className={ttcomons.className} type='text' id='location' maxLength={140} placeholder='' onChange={(e) => setEventLocation(e.target.value)}/>
                        <label className={styles.eventLable} htmlFor='location'>Место проведения{required}</label>
                    </div>

                    <div className={styles.eventInitiator}>
                        <div className={styles.userAvatar} style={{backgroundImage: `url(${'/user-head.png'})`}}></div>
                        <div className={styles.initiatorName}>
                            {userName}
                            <span>Организатор</span>
                        </div>
                    </div>

                    <div className={styles.eventPhotos}>
                        <FileUploaderPreview arr={eventPhotos} removePhoto={removePhoto}/>
                    </div>
                </div>

            </form>

            <Button
                btnClass={styles.submitEventBtn}
                btnName='Создать'
                disabled={false}
                onClick = {submitEvent}
            />
        </div>
    )
}

export default ModalCreateEvent;