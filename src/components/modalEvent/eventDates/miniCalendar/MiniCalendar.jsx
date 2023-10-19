'use client'
import { useUnit } from "effector-react"
import { useState } from 'react'

import moment from "moment"
import "moment/locale/ru"

import { redcollar } from '@/app/fonts'
import styles from './miniCalendar.module.scss'

import { model as dateModel } from '../../../_store/dateControl'

import { weekDays, colors, getMonthDays } from "@/components/_utils/utils"

import Button from "@/components/_shared/button/Button"

function MiniCalendar({showCalendar, setDate}) {
    const [initialDate, setCustomDate] = useUnit([
        dateModel.$currentDate,
        dateModel.setCustomDate
    ]);

    let [currentDate, setCurrentDate] = useState(initialDate);
    let [currentMonth, setCurrentMonth] = useState(currentDate.format('MMMM YYYY'));
    let [monthDays, setMonthDays] = useState(getMonthDays(currentDate));
    let [pickedDate, setPickedDate] = useState('');

    let updateCalendar = (date) => {
        setCurrentMonth(date.format('MMMM YYYY'));
        setMonthDays(getMonthDays(date));
    }

    let showNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
        updateCalendar(currentDate);
    }

    let showPrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
        updateCalendar(currentDate);
    }

    let handleClick = (e) => {
        setPickedDate(e.target.dataset.date);
    }

    let submitClick = () => {
        setCustomDate(pickedDate);
        showCalendar(false);
        setDate(pickedDate);
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
                        let backgroundColor;
                        let currentMonth = currentDate.month();

                        if(day.format() <= moment().format() || day.month() !== currentMonth) {
                            color = colors.darkGray;
                        } else {
                            color = colors.mainBlack;
                        }

                        if(day.toISOString(true) === pickedDate) {
                            backgroundColor = colors.mainAccent;
                            color = colors.white;
                        } else {
                            backgroundColor = colors.white;
                        }

                        return (
                            <div 
                                key={day.format()} 
                                className={styles.cell} 
                                style={{
                                    color: `${color}`,
                                    backgroundColor: `${backgroundColor}`
                                }} 
                                data-date={day.toISOString(true)}
                                onClick={(e) => handleClick(e)}
                            >
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
                onClick={submitClick}
            />
        </div>
    )
}

export default MiniCalendar;