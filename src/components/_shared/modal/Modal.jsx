import { useUnit } from 'effector-react'

import Image from 'next/image'

import styles from './modal.module.scss'
import { model as modalModel} from '@/components/_store/modalControl';
import { colors } from '@/components/_utils/utils';
import Button from '../button/Button';

function Modal({content, onClick}) {
    const [modalBackground, controlModalBackground] = useUnit ([
        modalModel.$modalBackground,
        modalModel.controlModalBackground,
    ]);

    let close = <Image src="/close.svg" width={40} height={40} alt="close modal" />;
    let joined = '/event-joined.png';
    let success = '/event-success1.png';
    let fail = '/event-fail.png';

    return (
        <div className={styles.modal}>
            <div 
                className={styles.modalContent}
                style={{
                    background: `url(${modalBackground === null? '' 
                                            : modalBackground === 'joined'? joined  
                                            : modalBackground === 200? success : fail}) no-repeat bottom right, ${colors.white}` 
                }}
            >
                <Button
                    btnClass={styles.modalCloseBtn}
                    btnName={close}
                    disabled={false}
                    onClick={onClick}
                />
                {content}
            </div>
        </div>
    )
}

export default Modal;