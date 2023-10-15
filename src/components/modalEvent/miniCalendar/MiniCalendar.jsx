'use client'

import { useUnit } from "effector-react"
import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"

import { redcollar } from '@/app/fonts'
import styles from './miniCalendar.module.scss'

import moment from "moment"
import "moment/locale/ru"

import { model as monthModel } from '../../_store/monthControl'
import { getMonthDays } from "@/components/_utils/utils"
import Button from "@/components/_shared/button/Button"

function MiniCalendar() {
    const initialDate = useUnit(monthModel.$currentDate);
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    let [currentDate, setCurrentDate] = useState(initialDate);
    let [currentMonth, setCurrentMonth] = useState(currentDate.format('MMMM YYYY'));
    let [monthDays, setMonthDays] = useState(getMonthDays(currentDate));

    let showNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
        setCurrentMonth(currentDate.format('MMMM YYYY'));
        setMonthDays(getMonthDays(currentDate))
    }

    let showPrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
        setCurrentMonth(currentDate.format('MMMM YYYY'));
        setMonthDays(getMonthDays(currentDate))
    }

    return (
        <div className={styles.miniCalendar}>
            <div className={styles.month}>
                <Button
                    btnClass={styles.arrowBackBtn}
                    btnName={''}
                    disabled={false}
                    onClick={showPrevMonth}
                />
                <span className={redcollar.className}>
                    {currentMonth[0].toUpperCase() + currentMonth.slice(1)}
                </span>
                <Button
                    btnClass={styles.arrowForwardBtn}
                    btnName={''}
                    disabled={false}
                    onClick={showNextMonth}
                />
            </div>
            <div className={styles.dayNames}>
                {
                    weekDays.map((day) => {
                        return (
                            <div key={day} className={styles.dayName} >
                                {day}
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.cells}>
                {
                    monthDays.map((day) => {
                        let color;
                        let currentMonth = currentDate.month();

                        if(day.format() <= moment().format() || day.month() !== currentMonth) {
                            color = '#A4A4A4';
                        } else {
                            color = '#000';
                        }

                        return (
                            <div key={day.format()} className={styles.cell} style={{color: `${color}`}}>
                                {day.format('D')}
                            </div>
                        )
                    })
                }
            </div>
            <Button
                btnClass={styles.submitDateBtn}
                btnName={'Применить'}
                disabled={false}
                // onClick={() => {
                //     nextMonth();
                //     setMonthDays(getMonthDays(currentDate));
                //     setCurrentMonth(currentDate.format('MMMM'));
                // }}
            />
        </div>
    )
}

export default MiniCalendar;