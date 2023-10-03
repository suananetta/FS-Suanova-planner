'use client'

import { redcollar } from '@/app/fonts'
import moment from "moment"
import "moment/locale/ru"
import styles from './calendar.module.scss'
import { useGetMonth } from '../_shared/hooks/useGetMonth'
import Link from "next/link"
import Image from "next/image"

function Calendar() {
    let monthDays = useGetMonth();
    let weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
   
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
                        let currentMonth = moment().month();

                        if(day.month() !== currentMonth) {
                            color = '#A4A4A4';
                        } else {
                            color = '#000';
                        }

                        return (
                            <div key={day.format()} className={styles.cell} style={{color: `${color}`}}>
                                {day.format('D')} {`${day.format('D') === '1'? day.format('MMM') : ''}`}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Calendar;