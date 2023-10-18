'use client'

import { useUnit } from "effector-react"
import Image from 'next/image'
import moment from "moment"
import "moment/locale/ru"

import { redcollar, ttcomons } from '@/app/fonts'
import styles from './eventInfo.module.scss'

// import { model as monthModel } from '../_store/dateControl'
// import { model as eventsModel } from "../_store/events"
import { model as authModel } from "@/components/_store/auth"
import { model as modalControl } from "@/components/_store/modalControl"
import { arrowForward, arrowBack, BASE_URL, colors } from "@/components/_utils/utils"
import { getFile, getFiles } from "@/components/_axios/requests"
// import Modal from "../_shared/modal/Modal"
import Button from "@/components/_shared/button/Button"
import { useEffect, useState } from "react"

function EventInfo({event, relevant}) {
    const userInfo = useUnit(authModel.$userInfo)

    const [callAuthlModal, callEventInfoModal] = useUnit([
        modalControl.callAuthlModal,
        modalControl.callEventInfoModal
    ])
    const [visiblePhotos, setVisiblePhotos] = useState(event.photos? event.photos.slice(0, 4) : []);

    let [isParticipant, setIsParticipant] =useState(false);

    let [start, setStart] = useState(1);
    let [step, setStep] = useState(4);
    let [left, setLeft] = useState(0);

    useEffect(() => {
        console.log(userInfo);
        if(event.participants) {
            event.participants.map((participant) => {
                if(participant.id === userInfo.id) {
                    setIsParticipant(true)
                }
            })
        }
    }, [])

    let handleClickArrow = (e) => {
        if (e.currentTarget.dataset.id === 'forward') {
            setVisiblePhotos(event.photos.slice(start, start+step));
            setStart(++start);
        } else {
            setStart(--start);
            setVisiblePhotos(event.photos.slice(start-1, start-1+step));
        }
        if(visiblePhotos[visiblePhotos.length-1].id === event.photos[event.photos.length-1].id) {
            setLeft('-150px');
        } else {
            setLeft('0px');
        }
    }

    let handleClickDot = (e) => {
        let indexStart = e.target.dataset.index;
        if(indexStart+step > event.photos.length) {
            setVisiblePhotos(event.photos.slice(indexStart, event.photos.length))
            setStart(indexStart);
        } else {
            setVisiblePhotos(event.photos.slice(indexStart, indexStart+step));
            setStart(indexStart);
        }
    }

    return (
        <div className={styles.eventBody}>
            <h2 className={redcollar.className}>{event.title}</h2>
            <div className={styles.eventOrgInfo}>
                <div className={styles.eventInfo}>
                    <div className={redcollar.className}>
                        {moment(event.dateStart).format('dddd')}<br/>
                        {moment(event.dateStart).format('DD MMMM')}<br/>
                        {moment(event.dateStart).format('LT')}
                    </div>
                    <span className={ttcomons.className}>{event.location}</span>
                </div>
                <p>{event.description}</p>
            </div>
            <div className={styles.eventParticipants}>
                <h3 className={redcollar.className}>Участники</h3>
                <div className={styles.eventParticipantsList}>
                    {
                        event.participants?
                            event.participants.map((participant) => {
                                return (
                                    <div className={styles.eventParticipant} key={participant.id}>
                                        <div className={styles.participantImg} style={{backgroundImage: `url(${'/user-head.png'})`}}></div>
                                        <span>{participant.username}</span>
                                    </div>
                                )
                            })
                        :
                            <></>
                    }
                </div>
            </div>
            <div className={styles.eventPhotos}>
                <div className={styles.photoControls}>
                    <h3 className={redcollar.className}>Галерея</h3>
                    <div className={styles.photoControlsBtns}>
                        <Button
                            btnClass={styles.arrowBackBtn}
                            btnName={arrowBack}
                            data={'back'}
                            disabled={start-1 === 0? true : false}
                            onClick={(e) => {
                                handleClickArrow(e)
                            }}
                        />
                        <Button
                            btnClass={styles.arrowForwardBtn}
                            btnName={arrowForward}
                            data={'forward'}
                            disabled={!event.photos? true : start+step > event.photos.length? true : false}
                            onClick={(e) => {
                                handleClickArrow(e)
                            }}
                        />
                    </div>
                </div>
                <div 
                    className={styles.eventGallery}
                    style={{
                        left: `${left}`
                    }}
                >
                    {
                        visiblePhotos?
                            visiblePhotos.map((photo) => {
                                console.log(event.photos[event.photos.length-1].id);
                                return (
                                    <div 
                                        key={photo.id}
                                        className={styles.photoItem}
                                        style={{
                                            backgroundImage: `url(${BASE_URL+photo.url})`,
                                        }}
                                    >
                                    </div>
                                )
                            })
                        :
                            <></>
                    }
                </div>
                <div className={styles.dots}>
                    {
                        event.photos?
                            event.photos.map((photo, index) => {
                                let background;
                                if(photo.id === visiblePhotos[0].id) {
                                    background = colors.mainAccent;
                                } else {
                                    background = colors.buttonsGray;
                                }
                                return (
                                    <div 
                                        key={photo.id} 
                                        className={styles.dot} 
                                        data-index={index} 
                                        style={{backgroundColor: `${background}`}}
                                        onClick={(e) => {
                                            handleClickDot(e)
                                        }}
                                    >   
                                    </div>
                                )
                            })
                        :
                            <></>
                    }
                </div>
            </div>
            {
                !relevant?
                    <></>
                :
                    localStorage.getItem('token') !== null && !isParticipant?
                        <Button
                            btnClass={styles.controlParticipationBtn}
                            btnName={'Присоединиться к событию'}
                            // disabled={false}
                            // onClick={() => {
                            //     nextMonth();
                            //     setMonthDays(getMonthDays(currentDate));
                            //     setCurrentMonth(currentDate.format('MMMM'));
                            // }}
                        />
                        :
                        localStorage.getItem('token') !== null && isParticipant?
                        <div 
                            className={redcollar.className} 
                            style={{
                                display: 'flex',
                                alignSelf: 'center',
                                marginTop: '64px'
                            }}
                        >
                            Вы присоединились к событию. Если передумали, можете&nbsp;
                            <span 
                                className={styles.accessLink}
                                
                            >
                                отменить участие.
                            </span>
                        </div>
                        :
                        <div 
                            className={redcollar.className} 
                            style={{
                                display: 'flex',
                                alignSelf: 'center',
                                marginTop: '64px'
                            }}
                        >
                            <span 
                                className={styles.accessLink}
                                onClick={() => {
                                    callAuthlModal();
                                    callEventInfoModal();
                                }}
                            >
                                Войдите
                            </span>
                            , чтобы присоединиться к событию
                        </div>
            }
        </div>
    )
}

export default EventInfo;