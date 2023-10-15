'use client'

import { useUnit } from "effector-react"
import moment from "moment"
import "moment/locale/ru"

import { redcollar } from '@/app/fonts'
import styles from './calendar.module.scss'

import { model as monthModel } from '../_store/monthControl'

function Calendar({monthDays}) {
    const currentDate = useUnit(monthModel.$currentDate);
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return (
        <div className={redcollar.className}>
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

                        if(day.month() !== currentMonth) {
                            color = '#A4A4A4';
                        } else {
                            color = '#000';
                        }

                        return (
                            <div key={day.format()} className={styles.cell} style={{color: `${color}`}}>
                                {day.format('D')} {day.format('D') === '1'? day.format('MMM') : ''}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Calendar;