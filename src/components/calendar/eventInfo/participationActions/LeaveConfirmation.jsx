'use client'
import { useUnit } from 'effector-react'

import { redcollar } from '@/app/fonts'
import styles from '../eventInfo.module.scss'

import { model as modalControl } from '@/components/_store/modalControl'
import Button from '@/components/_shared/button/Button'
   
function LeaveConfirmation() {
    const [callEventInfoModal, controlModalBackground, callAdditionalEvenLeaveModal] = useUnit([
        modalControl.callEventInfoModal,
        modalControl.controlModalBackground,
        modalControl.callAdditionalEvenLeaveModal,
    ]);

    return (
        <div className={styles.cancelCreateEvent}>
            <h2 className={redcollar.className}>Вы действительно хотите отменить участие?</h2>
            <div className={styles.cancelBtns}>
                <Button
                    btnClass={styles.cancelBtn}
                    btnName={'Нет'}
                    onClick = {callAdditionalEvenLeaveModal}
                />  
                <Button
                    btnClass={styles.cancelBtn}
                    btnName={"Да"}
                    onClick = {() => {
                        callEventInfoModal();
                        callAdditionalEvenLeaveModal()
                        controlModalBackground(null);
                    }}
                />  
            </div>
        </div>
    )
}
export default LeaveConfirmation;