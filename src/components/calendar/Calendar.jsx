'use client'

import { useUnit } from "effector-react"

import moment from "moment"
import "moment/locale/ru"

import { redcollar } from '@/app/fonts'
import styles from './calendar.module.scss'

import { model as monthModel } from '../_store/dateControl'
import { weekDays, colors } from "../_utils/utils"

function Calendar({monthDays}) {
    const currentDate = useUnit(monthModel.$currentDate);

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
                            color = colors.darkGray;
                        } else {
                            color = colors.mainBlack;
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