'use client'

import styles from '../eventInfo.module.scss'
    
function EtcParticipants({start, participants}) {
    let participantsCount = participants.length - start;
    let etcIconsCount = participantsCount >= 3? 3 : participantsCount;
    let participantsArr = participants.slice(start, start+etcIconsCount);
    
    return (
        <div className={styles.etcParticipants}>
            <div className={styles.participantImgs}>
                {
                    participantsArr.map((participant, index) => {
                        return (
                            <div 
                                key={participant.id}
                                className={styles.participantImgItem} 
                                style={{
                                    backgroundImage: `url(${'/user-head.png'})`,
                                    zIndex: `${index === 1? '222' : index === 0? '333' : '0'}`,
                                    marginRight: `${index === 1 || index === 0? '-25px' : '0'}`
                                }}
                            >
                            </div>
                        )
                    })
                }
            </div>
            <span
                style={{
                    marginLeft: `${participantsArr.length === 3? '12px' : '37px'}`
                }}
            >
                {`Ещё +${participantsCount}`}
            </span>
        </div>
    )
}
export default EtcParticipants;