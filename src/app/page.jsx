'use client'

import { useEffect, useState } from 'react'
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
import MiniCalendar from '@/components/modalEvent/eventDates/miniCalendar/MiniCalendar'



export default function Home() {
  const [modalOpened, additionalModal, controAuthlModal, controlEventModal, controlModalBackground, callAdditionalModal] = useUnit ([
    modalModel.$modalOpened,
    modalModel.$additionalModal,
    modalModel.controAuthlModal,
    modalModel.controlEventModal,
    modalModel.controlModalBackground,
    modalModel.callAdditionalModal,
    modalModel.controlAdditionalModal
  ]);

  const [userToken, getUserToken] = useUnit([
    authModel.$userToken,
    authModel.getUserToken
  ])

  let [monthDays, setMonthDays] = useState([]);
  let [token, setToken] = useState(userToken);
  let [authModalOpened, setAuthModalOpened] = useState(modalOpened.authlModal);
  let [createEventModalOpened, setCreateEventModalOpened] = useState(modalOpened.eventModal);
  let [background, setBackground] = useState('');
  

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      setToken(localStorage.getItem('token'));
      getUserToken(localStorage.getItem('token'));
    }
  }, [])
  // console.log(token);
  // console.log(createEventModalOpened);
  return (
    <>
      <Header 
        setMonthDays={setMonthDays} 
        openAuth={setAuthModalOpened} 
        createEvent={setCreateEventModalOpened} 
        token={token}
      />
      <main className={ttcomons.className}>
        <Calendar monthDays={monthDays}/>
        {
          authModalOpened?
            <Modal 
              content={<ModalAuth setModalOpened={setAuthModalOpened} setToken={setToken}/>} 
              onClick={() => {
                controAuthlModal();
                setAuthModalOpened(modalOpened.authlModal);
              }}
            />
            :
            <></>
        }
        {
          createEventModalOpened?
            <Modal 
                content={<ModalCreateEvent setModalOpened={setCreateEventModalOpened}/>} 
                onClick={() => {
                      callAdditionalModal();
                      // controlEventModal();
                      // controlModalBackground(null);
                      // setCreateEventModalOpened(modalOpened.eventModal);
                  } 
                }
            />
            :
            <></>
        }
      </main>
    </>
  )
}
