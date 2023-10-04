'use client'

import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import moment from 'moment'

import Link from 'next/link'
import Image from 'next/image'

import styles from './header.module.scss'

import { model as monthModel } from '../_store/monthControl'
import Button from '../_shared/Button/Button'

function Header({setMonthDays}) {
    const [currentDate, prevMonth, nextMonth] = useUnit([
        monthModel.$currentDate,
        monthModel.prevMonth,
        monthModel.nextMonth,
    ]
    );

    let [currentMonth, setCurrentMonth] = useState(currentDate.format('MMMM'));

    let arrowBack = <Image src="/arrow-back.svg" width={32} height={32} alt="arrow back" />;
    let arrowForward = <Image src="/arrow-forward.svg" width={32} height={32} alt="arrow forward" />;

    let getMonthDays = (date) => {
        moment.updateLocale('ru', {week: {dow: 1}});

        let firstDay = date.clone().startOf('month').startOf('week');
        let d = firstDay.clone().subtract(1, 'day');

        let arr = [...Array(42)].map(() => d.add(1, 'day').clone());
        return arr;
    }

    useEffect(() => {
        setMonthDays(getMonthDays(moment()));
    }, [])

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
                <Button
                    btnClass={styles.authorizationBtn}
                    btnName='Войти'
                    disabled={false}
                    // onClick
                />
            </div>
        </header>
    )
}

export default Header;