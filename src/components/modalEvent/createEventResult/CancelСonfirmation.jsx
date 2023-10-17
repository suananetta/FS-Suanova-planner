'use client'
import { useUnit } from 'effector-react'

import { redcollar } from '@/app/fonts'
import styles from '../modalCreateEvent.module.scss'

import { model as modalModel } from '@/components/_store/modalControl'
import Button from '@/components/_shared/button/Button'
   
function CancelСonfirmation({setModalOpened}) {
    const [modalOpened, controlEventModal, controlModalBackground, callAdditionalModal, controlAdditionalModal] = useUnit([
        modalModel.$modalOpened,
        modalModel.controlEventModal,
        modalModel.controlModalBackground,
        modalModel.callAdditionalModal,
        modalModel.controlAdditionalModal
    ]);

    return (
        <div className={styles.cancelCreateEvent}>
            <h2 className={redcollar.className}>Передумали создавать событие?</h2>
            <div className={styles.cancelBtns}>
                <Button
                    btnClass={styles.cancelBtn}
                    btnName={'Нет'}
                    onClick = {() => {
                        callAdditionalModal();
                        controlAdditionalModal();
                        setModalOpened(modalOpened.additionalModal);
                    }}
                />  
                <Button
                    btnClass={styles.cancelBtn}
                    btnName={"Да"}
                    onClick = {() => {
                        controlEventModal();
                        callAdditionalModal();
                        controlModalBackground(null);
                        setModalOpened(modalOpened.eventModal);
                    }}
                />  
            </div>
        </div>
    )
}
export default CancelСonfirmation;