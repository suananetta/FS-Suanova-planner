'use client'

import { useState } from 'react'
import { useUnit } from "effector-react"

import moment from "moment"

import { ttcomons, redcollar } from './fonts'

import { model as modalModel } from '@/components/_store/modalControl'
import { model as authModel} from '@/components/_store/auth'
import Header from '@/components/header/Header'
import Calendar from '@/components/calendar/Calendar'
import Modal from '@/components/_shared/modal/Modal'
import ModalAuth from '@/components/modalAuth/modalAuth'
import ModalCreateEvent from '@/components/modalEvent/ModalCreateEvent'



export default function Home() {
  const authModal = useUnit(modalModel.$authModal);
  const userToken = useUnit(authModel.$userToken)

  let [monthDays, setMonthDays] = useState([]);
  let [token, setToken] = useState(userToken);
  let [modalOpened, setModalOpened] = useState(authModal.opened);

  
  console.log(token);
  // console.log(modalOpened);
  return (
    <>
      <Header setMonthDays={setMonthDays} setModalOpened={setModalOpened} token={token}/>
      <main className={ttcomons.className}>
        <Calendar monthDays={monthDays}/>
        {
          modalOpened?
            <Modal content={<ModalAuth setModalOpened={setModalOpened} setToken={setToken}/>} setModalOpened={setModalOpened}/>
            :
            <></>
        }
        <Modal content={<ModalCreateEvent/>} setModalOpened={setModalOpened}/>
      </main>
    </>
  )
}
