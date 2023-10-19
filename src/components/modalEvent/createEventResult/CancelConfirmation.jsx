'use client'
import { useUnit } from 'effector-react'

import { redcollar } from '@/app/fonts'
import styles from '../modalCreateEvent.module.scss'

import { model as modalControl } from '@/components/_store/modalControl'
import Button from '@/components/_shared/button/Button'
   
function CancelConfirmation() {
    const [callEventModal, controlModalBackground, callAdditionalModal] = useUnit([
        modalControl.callEventModal,
        modalControl.controlModalBackground,
        modalControl.callAdditionalCreateEventModal,
    ]);

    return (
        <div className={styles.cancelCreateEvent}>
            <h2 className={redcollar.className}>Передумали создавать событие?</h2>
            <div className={styles.cancelBtns}>
                <Button
                    btnClass={styles.cancelBtn}
                    btnName={'Нет'}
                    onClick = {callAdditionalModal}
                />  
                <Button
                    btnClass={styles.cancelBtn}
                    btnName={"Да"}
                    onClick = {() => {
                        callEventModal();
                        callAdditionalModal();
                        controlModalBackground(null);
                    }}
                />  
            </div>
        </div>
    )
}
export default CancelConfirmation;