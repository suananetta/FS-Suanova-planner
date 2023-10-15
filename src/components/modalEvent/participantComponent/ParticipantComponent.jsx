'use client'

import Image from 'next/image'
import styles from '../modalCreateEvent.module.scss'

import Button from '@/components/_shared/button/Button'

function ParticipantComponent({arr, chosen, add, remove}) {

    let removeParticipant = <Image src="/delete-participant.svg" width={24} height={24} alt="information" />; 

    return (
        <div className={chosen? styles.chosenParticipants : styles.eventParticipants}>
            {
                arr.filter((user) => user !== undefined).map((user) => {
                    return (
                        <div 
                            className={chosen? styles.chosenParticipant : styles.participantInfo} 
                            key={user.id} 
                            data-id={user.id}
                            onClick={add}
                        >
                            <div 
                                className={chosen? styles.chosenParticipantImg : styles.participantImg} 
                                style={{backgroundImage: `url(${'/user-head.png'})`}} 
                                data-id={user.id} 
                                onClick={add}>
                            </div>
                            <span data-id={user.id} onClick={add}>{user.username}</span>

                            {
                                chosen?
                                    <Button
                                        btnClass={styles.deleteParticipantBtn}
                                        btnName={removeParticipant}
                                        data={user.id}
                                        onClick={remove}
                                    />
                                    :
                                    <></>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ParticipantComponent;