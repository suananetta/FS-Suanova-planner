'use client'

import { useEffect, useState } from "react"
import moment from "moment"
import "moment/locale/ru"

export const useGetMonth = () => {
    
    moment.updateLocale('ru', {week: {dow: 1}});

    let [currentDay, setCurrentDay] = useState(moment());
    let firstDay = currentDay.clone().startOf('month').startOf('week');
    let d = firstDay.clone().subtract(1, 'day');

    let arr = [...Array(42)].map(() => d.add(1, 'day').clone());
    console.log(moment().format("MMM"));
    return arr;
}