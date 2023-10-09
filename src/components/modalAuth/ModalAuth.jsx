'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import styles from './modalAuth.module.scss'
import { redcollar } from '@/app/fonts'

import Button from '../_shared/button/Button'
import PasswordInput from './passwordInput/passwordInput'
import { model as authModel} from '../_store/auth'
import { model as modalModel} from '../_store/modalControl'

function ModalAuth({setModalOpened, setToken}) {
    const [userToken, checkUser, loginUser, registerUser, getUserToken] = useUnit([
        authModel.$userToken,
        authModel.checkUserFx,
        authModel.loginUserFx,
        authModel.registerUserFx,
        authModel.getUserToken
    ]
    );

    const [modalOpened, controlModal] = useUnit ([
        modalModel.$modalOpened,
        modalModel.controAuthlModal,
    ]);

    let [emailFound, setEmailFound] = useState(false);
    let [registrartion, setRegistretion] = useState(false);
    
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');

    let [showPassword, setShowPassword] = useState(false);
    let [showRepeatPassword, setShowRepeatPassword] = useState(false);

    let infoIcon = <Image src="/info.svg" width={24} height={24} alt="information" />; 
    let openedPassword = "/password-show.svg";
    let hidenPassword = "/password-hide.svg";

    let handleClickEmail = async () => {
        try {
            let result = await checkUser(email);
            if(result.status === 204) {
                setEmailFound(true);
                setRegistretion(false);
            }
        } catch (error) {
            setRegistretion(true);
        }
    }

    let handleClickLogin = async () => {
        let userInfo = {
            "email": email,
            "password": password
        }

        let token = await loginUser(userInfo);

        getUserToken(token.data.jwt);
        setToken(token.data.jwt);

        localStorage.setItem('token', token.data.jwt)

        if(token.status === 200) {
            controlModal();
            setModalOpened(modalOpened.authlModal);
        }
    }

    let handleClickRegister = async () => {
        let userInfo = {
            "username": email,
            "email": email,
            "password": password
        }

        let result = await registerUser(userInfo);
        getUserToken(result.data.jwt);

        if(result.status === 200) {
            controlModal();
            setModalOpened(modalOpened.authlModal);
        }
    }

    return (
        <div className={styles.modalAuth}>
            <h2 className={redcollar.className}>{registrartion? 'Регистрация' : 'Вход'}</h2>
            {
                registrartion?
                    <>
                        <div className={styles.regInfo}>
                            {infoIcon}
                            <p>{'Используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )'}</p>
                        </div>
                        <PasswordInput
                            className={styles.modalInput}
                            type={showPassword? 'text' : 'password'}
                            repeat={false}
                            onChange={(e) => {setPassword(e.target.value)}}
                            background={showPassword? openedPassword : hidenPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <PasswordInput
                            className={styles.modalInput}
                            type={showPassword? 'text' : 'password'}
                            repeat={true}
                            onChange={(e) => {setRepeatPassword(e.target.value)}}
                            background={showRepeatPassword? openedPassword : hidenPassword}
                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        />
                        <Button
                            btnClass={styles.modalContinueBtn}
                            btnName='Зарегистрироваться'
                            disabled={false}
                            onClick={handleClickRegister}
                        />
                    </>
                    :
                    <>
                    {
                        !emailFound?
                            <>
                            <div className={styles.modalInput}>
                                <input className={styles.auth} type="email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                                <label className={styles.auth} htmlFor="email">E-mail</label>
                            </div>
                            <Button
                                btnClass={styles.modalContinueBtn}
                                btnName='Далее'
                                disabled={email.trim().length === 0? true : false}
                                onClick={handleClickEmail}
                            />
                            </>
                            :
                            <>
                            <PasswordInput
                                className={styles.modalInput}
                                type={showPassword? 'text' : 'password'}
                                repeat={false}
                                onChange={(e) => {setPassword(e.target.value)}}
                                background={showPassword? openedPassword : hidenPassword}
                                onClick={() => setShowPassword(!showPassword)}
                            /> 
                            <Button
                                btnClass={styles.modalContinueBtn}
                                btnName='Далее'
                                disabled={password.trim().length === 0? true : false}
                                onClick={handleClickLogin}
                            />
                            </>                         
                    }                  
                    </>
            }       
        </div>
    )
}

export default ModalAuth;