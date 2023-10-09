'use client'

import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import moment from 'moment'

import Link from 'next/link'
import Image from 'next/image'

import styles from './header.module.scss'

import { model as monthModel } from '../_store/monthControl'
import { model as modalModel } from '../_store/modalControl'
import { model as  authModel} from '../_store/auth'
import { getMonthDays } from '../_utils/utils'
import Button from '../_shared/button/Button'

function Header({setMonthDays, openAuth, createEvent, token}) {
    const [currentDate, prevMonth, nextMonth] = useUnit([
        monthModel.$currentDate,
        monthModel.prevMonth,
        monthModel.nextMonth,
    ]
    );

    const [modalOpened, controAuthlModal, controlEventModal] = useUnit ([
        modalModel.$modalOpened,
        // modalModel.$createEventModal,
        modalModel.controAuthlModal,
        modalModel.controlEventModal
    ]);
    // console.log(createEventModal);
    useEffect(() => {
        setMonthDays(getMonthDays(moment()));
    }, []);

    let [currentMonth, setCurrentMonth] = useState(currentDate.format('MMMM'));

    let arrowBack = <Image src="/arrow-back.svg" width={32} height={32} alt="arrow back" />;
    let arrowForward = <Image src="/arrow-forward.svg" width={32} height={32} alt="arrow forward" />; 
    let addEvent = <Image src="/add-event.svg" width={22} height={22} alt="arrow forward" />; 

    return (
        <header>
            <div className={styles.headerIntro}>
                <div className={styles.logo}>
                    <Image src="/logo.svg" width={53} height={31} alt="logo red collar" />
                    <span>red collar</span>
                </div>
                <h1 className={styles.title}>planner <span>event</span></h1>
            </div>
            <div className={styles.headerControls}>
                <div className={styles.monthControls}>
                    <span className={styles.month}>
                        {currentMonth[0].toUpperCase() + currentMonth.slice(1) + ' '}
                        {currentDate.year() !== moment().year()? currentDate.year() : ''}
                    </span>
                    
                    <Button
                        btnClass={styles.arrowBackBtn}
                        btnName={arrowBack}
                        disabled={false}
                        onClick={() => {
                            prevMonth();
                            setMonthDays(getMonthDays(currentDate));
                            setCurrentMonth(currentDate.format('MMMM'));
                        }}
                    />
                    <Button
                        btnClass={styles.arrowForwardBtn}
                        btnName={arrowForward}
                        disabled={false}
                        onClick={() => {
                            nextMonth();
                            setMonthDays(getMonthDays(currentDate));
                            setCurrentMonth(currentDate.format('MMMM'));
                        }}
                    />
                </div>
                {
                    token === null?
                        <Button
                            btnClass={styles.authorizationBtn}
                            btnName='Войти'
                            disabled={false}
                            onClick = {() => {
                                controAuthlModal();
                                openAuth(modalOpened.authlModal);
                            }}
                        />
                    :
                        <div className={styles.userBlock}>
                            <Button
                                btnClass={styles.addEventBtn}
                                btnName={addEvent}
                                disabled={false}
                                onClick = {
                                    () => {
                                        console.log(modalOpened.eventModal);
                                        controlEventModal();
                                        createEvent(modalOpened.eventModal);
                                        console.log(modalOpened.eventModal);
                                    }
                                }
                            />
                            <div className={styles.userAvatar} style={{backgroundImage: `url(${'/user-head.png'})`}}></div>
                        </div>
                }
                </div>
        </header>
    )
}

export default Header;