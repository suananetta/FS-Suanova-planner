'use client'

import { useState } from 'react'
import { useUnit } from "effector-react"

import moment from "moment"

import { ttcomons, redcollar } from './fonts'

import { model as modalModel } from '@/components/_store/modalControl'
import Header from '@/components/header/Header'
import Calendar from '@/components/calendar/Calendar'
import Modal from '@/components/_shared/modal/Modal'
import ModalAuth from '@/components/modalAuth/modalAuth'



export default function Home() {
  const authModal = useUnit(modalModel.$authModal)

  let [monthDays, setMonthDays] = useState([]);
  let [modalOpened, setModalOpened] = useState(authModal.opened);

  
  // console.log(authModal);
  // console.log(modalOpened);
  return (
    <>
      <Header setMonthDays={setMonthDays} setModalOpened={setModalOpened}/>
      <main className={ttcomons.className}>
        <Calendar monthDays={monthDays}/>
        {
          modalOpened?
            <Modal content={<ModalAuth/>} setModalOpened={setModalOpened}/>
            :
            <></>
        }
      </main>
    </>
  )
}
