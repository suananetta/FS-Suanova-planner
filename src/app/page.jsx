'use client'

import { useEffect, useState } from 'react'
import { useUnit } from "effector-react"

import { ttcomons, redcollar } from './fonts'

import { model as modalControl } from '@/components/_store/modalControl'
import { model as authModel} from '@/components/_store/auth'
import { model as eventsModel } from '@/components/_store/events'

import Header from '@/components/header/Header'
import Calendar from '@/components/calendar/Calendar'
import Modal from '@/components/_shared/modal/Modal'
import ModalAuth from '@/components/modalAuth/modalAuth'
import ModalCreateEvent from '@/components/modalEvent/ModalCreateEvent'

export default function Home() {
  const [authlModal, eventModal, eventInfoModal, callAdditionalModal, callAuthlModal] = useUnit ([
    modalControl.$authlModal,
    modalControl.$eventModal,
    modalControl.$eventInfoModal,
    modalControl.callAdditionalCreateEventModal,
    modalControl.callAuthlModal,
  ]);

  const [userToken, getUserToken, getUserInfo] = useUnit([
    authModel.$userToken,
    authModel.getUserToken,
    authModel.getUserInfoFx
  ]);

  const [getEventsForLogedUSer, getEventsForPublic] = useUnit([
    eventsModel.getEventsForLogedUSerFX,
    eventsModel.getEventsForPublicFX
  ])

  let [monthDays, setMonthDays] = useState([]);
  let [token, setToken] = useState(userToken);

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      getUserInfo();
      setToken(localStorage.getItem('token'));
      getUserToken(localStorage.getItem('token'));
      getEventsForLogedUSer();
    } else {
      getEventsForPublic();
    }
  }, [[], userToken, eventInfoModal])

  return (
    <>
      <Header 
        setMonthDays={setMonthDays} 
        token={token}
        setToken={setToken}
      />
      <main className={ttcomons.className}>
        <Calendar monthDays={monthDays}/>
        {
          authlModal?
            <Modal 
              content={<ModalAuth setToken={setToken}/>} 
              onClick={callAuthlModal}
            />
            :
            <></>
        }
        {
          eventModal?
            <Modal 
                content={<ModalCreateEvent/>} 
                onClick={callAdditionalModal}
            />
            :
            <></>
        }
      </main>
    </>
  )
}
