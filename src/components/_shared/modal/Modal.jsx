import { useUnit } from 'effector-react'

import Image from 'next/image'

import styles from './modal.module.scss'

import { model as modalModel} from '@/components/_store/modalControl';
import Button from '../button/Button';

function Modal({content, setModalOpened}) {
    const [authModal, controlModal] = useUnit ([
        modalModel.$authModal,
        modalModel.controlModal,
    ]);

    let close = <Image src="/close.svg" width={40} height={40} alt="close modal" />;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <Button
                    btnClass={styles.modalCloseBtn}
                    btnName={close}
                    disabled={false}
                    onClick={() => {
                        controlModal();
                        setModalOpened(authModal.opened);
                    }}
                />
                {content}
            </div>
        </div>
    )
}

export default Modal;