'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import styles from './modalAuth.module.scss'
import { redcollar } from '@/app/fonts'

import Button from '../_shared/button/Button'
import { checkUserExistence, loginUser } from '../_axios/requests'
import { model as authModel} from '../_store/auth'


function ModalAuth() {
    // let close = <Image src="/close.svg" width={40} height={40} alt="close modal" />;
    const [user, checkUser, loginUser, getUserToken] = useUnit([
        authModel.$userToken,
        authModel.checkUserFx,
        authModel.loginUserFx,
        authModel.getUserToken
    ]
    );

    console.log(authModel);

    let [emailFound, setEmailFound] = useState(true);
    let [registrartion, setRegistretion] = useState(true);
    
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let infoIcon = <Image src="/info.svg" width={24} height={24} alt="information" />; 
    
    return (
        <div className={styles.modalAuth}>
            <h2 className={redcollar.className}>{registrartion? 'Регистрация' : 'Вход'}</h2>
            {
                !emailFound? 
                    <div className={styles.modalInput}>
                        <input className={styles.auth} type="email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                        <label className={styles.auth} htmlFor="email">E-mail</label>
                    </div>
                    :
                    registrartion?
                    <>
                        <div className={styles.regInfo}>
                            {infoIcon}
                            <p>{'Используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )'}</p>
                        </div>
                        <div className={styles.modalInput}>
                            <input className={styles.auth} type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <label className={styles.auth} htmlFor="password">Пароль</label>
                            <div></div>
                        </div>
                        <div className={styles.modalInputRepeat}>
                            <input className={styles.auth} type="text" id="password" placeholder='Повторите пароль' onChange={(e) => {setPassword(e.target.value)}}/>
                            <label className={styles.auth} htmlFor="password">Повторите пароль</label>
                            <div></div>
                        </div>
                    </>
                    :
                    <div className={styles.modalInput}>
                            <input className={styles.auth} type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <label className={styles.authLable} htmlFor="password">Пароль</label>
                            <div></div>
                    </div>
            }       
            <Button
                btnClass={styles.modalContinueBtn}
                btnName='Далее'
                disabled={false}
                onClick={async () => {
                    if(!emailFound) {
                        let res = await checkUser(email);
                        if(res) {
                            
                        }
                    } else {
                        let res = await loginUser(email, password);
                        console.log(res);
                    }
                    // if(!emailFound) {
                    //     let result = await checkUserExistence(email);
                    //     if (result.status === 204) setEmailFound(true);
                    //     console.log(email);
                    //     console.log(password);  
                    // } else {
                    //     let result = await loginUser(email, password);
                    //     result.data.jwt;
                    //     console.log(email);
                    //     console.log(password);
                    //     console.log(result);
                    // }
                }}
            />
        </div>
    )
}

export default ModalAuth;