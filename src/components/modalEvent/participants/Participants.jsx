'use client'

import { ttcomons } from '@/app/fonts'
import styles from '../modalCreateEvent.module.scss'

import ParticipantComponent from './ParticipantComponent'

function Participants({allUsers, eventParticipants, showUsersList, setShowUsersList, removeParticipant, addParticipant}) {
    return (
        <>
            {
                eventParticipants.length > 0?
                <div className={styles.participantsInfoItem}>
                    <input 
                        className={ttcomons.className} 
                        readOnly
                        id='eventPartisipants' 
                        onFocus={() => setShowUsersList(!showUsersList)} 
                    />
                    <label className={styles.participantsLable} htmlFor='eventPartisipants'>Участники</label>
                </div>
                :
                <>
                    <input 
                        className={ttcomons.className} 
                        type='text' 
                        id='eventPartisipants' 
                        onFocus={() => setShowUsersList(!showUsersList)} 
                        placeholder=''
                    />
                    <label className={styles.eventLable} htmlFor='eventPartisipants'>Участники</label>
                </>
            }
                <ParticipantComponent
                    arr={eventParticipants}
                    chosen={true}
                    remove={(e) => removeParticipant(e)}
                />
            {
                showUsersList?
                    <ParticipantComponent
                        arr={allUsers}
                        chosen={false}
                        add={(e) => {addParticipant(e)}}
                    />
                :
                    <></>
            }
        </>
    )
}

export default Participants;