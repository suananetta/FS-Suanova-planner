'use client'
import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import moment from 'moment'
import "moment/locale/ru"

import { redcollar, ttcomons } from '@/app/fonts'
import styles from './modalCreateEvent.module.scss'

import { model as authModel } from '../_store/auth'
import { model as modalModel } from '../_store/modalControl'
import { validateFile, validateTime } from '../_utils/validation'
import { createNewEvent, uploadFile, updateNewEventWithPhotos } from '../_axios/requests'

import Button from '../_shared/button/Button'
import Participants from './participants/Participants'
import FileUploader from './fileUploader/FileUploader'
import FileUploaderPreview from './fileUploader/FileUploaderPreview'
import EventDates from './eventDates/EventDates'
import CreateEventResult from './createEventResult/CreateEventResult'
import CancelConfirmation from './createEventResult/CancelConfirmation'
import Modal from '../_shared/modal/Modal'

function ModalCreateEvent() {
    const [userInfo, getAllUsersFx, getUserInfo] = useUnit([
        authModel.$userInfo,
        authModel.getAllUsersFx,
        authModel.getUserInfoFx,
    ]);

    const [additionalModal, callEventModal, controlModalBackground, callAdditionalModal] = useUnit([
        modalModel.$additionalCreateEventModal,
        modalModel.callEventModal,
        modalModel.controlModalBackground,
        modalModel.callAdditionalCreateEventModal
    ])

    let [allUsers, setAllUsers] = useState([]);
    let [eventStatus, setEventStatus] = useState('');

    let [eventTitle, setEventTitle] = useState('');
    let [eventDescription, setEventDescription] = useState('');
    let [eventParticipants, setEventParticipants] = useState([]);
    let [eventTime, setEventTime] = useState('');
    let [eventLocation, setEventLocation] = useState('');
    let [eventPhotos, setEventPhotos] = useState([]);
    let [eventStart, setEventStart] = useState('');
    let [eventEnd, setEventEnd] = useState('');

    let [showUsersList, setShowUsersList] = useState(false);

    let [errorFile, setErrorFile] = useState('');

    let [photosIDs, setPhotosIDs] = useState([]);
    let [inappropriateData, setInappropriateData] = useState(true);

    let getUsersArray = async() => {
        let res = await getAllUsersFx();
        setAllUsers(res);
    } 

    let getUser = async() => {
        await getUserInfo();
    }

    let getUploadedFileID = async(file) => {
       let result = await uploadFile(file);
       return result.data[0].id;
    }

    let uploadFiles = async (files) => {
        let formData = new FormData();
        let uploadedFiles = [];
        Array.from(files).forEach((file) => {
            formData.append('files', file);         
        })

        formData.getAll('files').forEach((file) => {
            getUploadedFileID(file).then(res => uploadedFiles.push(res))
            
        });

        return uploadedFiles;
    }

    let createEvent = async(eventData) => {
        try {
            let res = await createNewEvent(eventData);
            setEventStatus(res.status);
            controlModalBackground(res.status);
        } catch(error) {
            setEventStatus(error.response.status);
            controlModalBackground(error.response.status);
        }
    }

    let checkData = () => {
        if( eventTitle.length > 0 && 
            eventDescription.length > 0 &&
            eventTime.length === 5 &&
            eventStart !== '' &&
            eventLocation.length > 0) 
        {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        getUsersArray();
        getUser();
    }, [])

    useEffect(() => {
        let checkedData = checkData();
        setInappropriateData(checkedData);
    }, [eventTitle, eventDescription, eventTime, eventStart, eventLocation])

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
        let errors = validateFile(files);

        Array.from(files).map((file) => {
            if(errors.length > 0) {
                errors.map((error) => {
                    setEventPhotos([...eventPhotos, ...files.filter((file) => file.name !== error.fileName)]);
                })
            } else {
                setEventPhotos([...eventPhotos, ...files]);
            }            
        })

        setErrorFile(errors);
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

        let dateTime = eventStart.slice(0,11) + eventTime + eventStart.slice(16, eventStart.length);

        let photos = await uploadFiles(eventPhotos);

        let eventData = {
            "data": {
              "dateStart": dateTime,
              "title": eventTitle,
              "description": eventDescription,
              "photos": photos,
              "location": eventLocation,
              "dateEnd": eventEnd? eventEnd : dateTime,
              "participants": partisipantsIDs,
              "owner": userInfo.username
            }
        }

        return eventData;
    }

    let required = <span className={styles.required}>*</span>

    return (
        <div className={styles.modalCreateEvent}>
            {
                additionalModal?
                <Modal
                    content={<CancelConfirmation/>} 
                    onClick={() => {
                        callAdditionalModal();
                    }}
                />
                :
                <></>
            }
            {
                eventStatus === ''?
                    <>
                    <h2 className={redcollar.className}>Создание события</h2>
                    <form className={styles.eventForm}>
                        <div className={styles.eventDescriptionInfo}>
                            <div className={styles.eventInfoItem}>
                                <input 
                                    className={ttcomons.className} 
                                    type='text' 
                                    id='eventTitle' 
                                    maxLength={140} 
                                    onChange={(e) => {setEventTitle(e.target.value)}} 
                                    placeholder='' 
                                    required
                                />
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
                                <input 
                                    className={styles.eventName} 
                                    type='text' 
                                    id='time' 
                                    placeholder='-- : --' 
                                    maxLength={5}
                                    onKeyUp={(e) => {
                                        validateTime(e);
                                        setEventTime(e.target.value);
                                    }}
                                    required
                                />
                                <label className={styles.labelTime} htmlFor='time'>Время{required}</label>
                            </div>

                            <div className={styles.eventInfoItem}>
                                <input className={ttcomons.className} type='text' id='location' maxLength={140} placeholder='' onChange={(e) => setEventLocation(e.target.value)}/>
                                <label className={styles.eventLable} htmlFor='location'>Место проведения{required}</label>
                            </div>

                            <div className={styles.eventInitiator}>
                                <div className={styles.userAvatar} style={{backgroundImage: `url(${'/user-head.png'})`}}></div>
                                <div className={styles.initiatorName}>
                                    {userInfo.username}
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
                        disabled={inappropriateData}
                        onClick = {async() => {
                            let data = await submitEvent();
                            await createEvent(data);
                            // console.log(data);
                            // let eventID = event.data.data.id;
                            // console.log(data);
                            // let update = await updateNewEventWithPhotos(eventID, data);
                            // console.log(update);
                        }}
                    />
                    </>
                :
                <Modal
                    content={
                        <CreateEventResult
                            status={eventStatus}
                            eventTitle={eventTitle}
                            eventStart={eventStart}
                            eventTime={eventTime}
                            eventLocation={eventLocation}
                        />
                    } 
                    onClick={() => {
                        callEventModal();
                        controlModalBackground(null);
                    }}
                />
            }
        </div>
    )
}

export default ModalCreateEvent;