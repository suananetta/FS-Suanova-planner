'use client'

import moment from "moment"

import { ttcomons } from './fonts'

import Header from '@/components/header/Header'
import Calendar from '@/components/calendar/Calendar'

import { useState } from 'react'

export default function Home() {
  let [monthDays, setMonthDays] = useState([]);

  return (
    <>
      <Header setMonthDays={setMonthDays}/>
      <main className={ttcomons.className}>
        <Calendar monthDays={monthDays}/>
      </main>
    </>
  )
}
