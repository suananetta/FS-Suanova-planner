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
import FileUploader from './fileUploader/FileUploader'

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
    let [eventPhotos, setEventPhotos] = useState([]);
    let [eventPhotosPreview, setEventPhotosPreview] = useState([]);
    console.log(eventPhotosPreview);
    console.log(eventPhotos);
    let [showUsersList, setShowUsersList] = useState(false);
    // let [drag, setDrag] = useState(false)

    let [errorFile, setErroeFile] = useState('')

    let getUsersArray = async() => {
        let res = await getAllUsersFx();
        setAllUsers(res);
    } 

    // console.log(allUsers);
    // console.log(eventParticipants);

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

    let addPhotos = async(files) => {
        let formData = new FormData();
        let errors = validateFile(files);
        console.log(errors);

        Array.from(files).forEach((file) => {
            if(errors.length > 0) {
                errors.forEach((error) => {
                    if(file.name !== error.fileName) {
                        // setEventPhotos([...eventPhotos, file]);
                        formData.append('files', file);
                    }
                })
            } else {
                formData.append('files', file);
                let preview = {
                    url: URL.createObjectURL(file),
                    alt: file.name
                }
                console.log(URL.createObjectURL(file));
                setEventPhotosPreview([...eventPhotosPreview, preview]);
            }            
        })

        setErroeFile(errors);

        formData.getAll('files').forEach((file) => {
            uploadFile(file).then(res => setEventPhotos([...eventPhotos, ...res.data]));           
        });
    }

    let removePhoto = (e) => {
        let arr = eventPhotos.filter((photo) => {photo.name !== e.target.dataset.id});

        setEventPhotos(arr);
        setEventPhotosPreview(eventPhotosPreview.filter((preview) => preview.alt !== e.target.dataset.id))

        console.log(arr);
    }

    let required = <span className={styles.required}>*</span>
    let deletePhotoBtn = <Image src="/delete-photo.svg" width={24} height={24} alt="information" />;

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
                    
                    <FileUploader addPhotos={addPhotos} errors={errorFile}/>
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

                    <div className={styles.eventPhotos}>
                        {
                            eventPhotosPreview.length > 0? 
                            eventPhotosPreview.slice(0, 4).map((photo) => {
                                return (
                                    <div className={styles.eventPhotoPreview} key={photo.alt}>
                                        <Image src={photo.url} width={134} height={81} alt={photo.alt} />
                                        <Button
                                            btnClass={styles.deletePhotoBtn}
                                            btnName={''}
                                            data={photo.alt}
                                            onClick={(e) => {removePhoto(e)}}
                                        />
                                    </div>
                                )
                            })
                            :
                            <></>
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ModalCreateEvent;