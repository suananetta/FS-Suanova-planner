'use client'
import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

import styles from './header.module.scss'

import { model as dateModel } from '../_store/dateControl'
import { model as modalModel } from '../_store/modalControl'
import { model as  authModel} from '../_store/auth'

import { getMonthDays, arrowBack, arrowForward } from '../_utils/utils'
import Button from '../_shared/button/Button'

function Header({setMonthDays, token, setToken}) {
    const [currentDate, prevMonth, nextMonth] = useUnit([
        dateModel.$currentDate,
        dateModel.prevMonth,
        dateModel.nextMonth,
    ]);

    const [authlModal, eventModal, callAuthlModal, callEventModal] = useUnit ([
        modalModel.$authlModal,
        modalModel.$eventModal,
        modalModel.callAuthlModal,
        modalModel.callEventModal
    ]);

    const getUserToken = useUnit(authModel.getUserToken);

    useEffect(() => {
        setMonthDays(getMonthDays(moment()));
    }, []);

    let [currentMonth, setCurrentMonth] = useState(currentDate.format('MMMM'));
    let [logout, setLogout] = useState(false);

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
                            onClick = {callAuthlModal}
                        />
                    :
                        <div className={styles.userBlock}>
                            <Button
                                btnClass={styles.addEventBtn}
                                btnName={addEvent}
                                disabled={false}
                                onClick = {callEventModal}
                            />
                            <div className={styles.userAvatar} style={{backgroundImage: `url(${'/user-head.png'})`}} onClick={() => setLogout(!logout)}></div>
                            {
                                logout?
                                <div className={styles.logout}>
                                    <Button
                                        btnClass={styles.logoutBtn}
                                        btnName='Выйти'
                                        disabled={false}
                                        onClick = {() => {
                                            localStorage.removeItem('token');
                                            setToken(null);
                                            getUserToken(null);
                                            setLogout(!logout)
                                        }}
                                    />
                                </div>
                                :
                                <></>
                            }
                        </div>
                }
                </div>
        </header>
    )
}

export default Header;