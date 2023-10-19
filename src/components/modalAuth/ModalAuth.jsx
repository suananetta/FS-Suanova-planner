'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import styles from './modalAuth.module.scss'
import { redcollar } from '@/app/fonts'

import Button from '../_shared/button/Button'
import PasswordInput from './passwordInput/passwordInput'

import { validateEmail, validatePassword } from '../_utils/validation'
import { colors } from '../_utils/utils'

import { model as authModel} from '../_store/auth'
import { model as modalControl} from '../_store/modalControl'

function ModalAuth({setToken}) {
    const [checkUser, loginUser, registerUser, getUserInfo, getUserToken] = useUnit([
        authModel.checkUserFx,
        authModel.loginUserFx,
        authModel.registerUserFx,
        authModel.getUserInfoFx,
        authModel.getUserToken,
    ]);
    
    const [callAuthlModal] = useUnit ([modalControl.callAuthlModal]);

    let [emailFound, setEmailFound] = useState(false);
    let [registrartion, setRegistretion] = useState(false);
    
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');

    let [showPassword, setShowPassword] = useState(false);
    let [showRepeatPassword, setShowRepeatPassword] = useState(false);

    let [errorEmail, setErrorEmail] = useState('');
    let [errorLoginPassword, setErrorLoginPassword] = useState('');
    let [errorRepeatPassword, setErrorRepeatPassword] = useState('');

    let infoIcon = <Image src="/info.svg" width={24} height={24} alt="information" />; 
    let openedPassword = "/password-show.svg";
    let hidenPassword = "/password-hide.svg";

    let handleClickEmail = async (email) => {
        if(validateEmail(email)) {
            setErrorEmail('');
            try {
                let result = await checkUser(email);
                if(result.status === 204) {
                    setEmailFound(true);
                    setRegistretion(false);
                }
            } catch (error) {
                setRegistretion(true);
            }
        } else {
            setErrorEmail({
                error: true,
                message: 'Некорректный e-mail'
            })
        }  
    }

    let handleClickLogin = async () => {
        let userInfo = {
            "email": email,
            "password": password
        }

        try {
            let token = await loginUser(userInfo);

            getUserToken(token.data.jwt);
            setToken(token.data.jwt);
    
            localStorage.setItem('token', token.data.jwt)
    
            await getUserInfo();
            setErrorLoginPassword('');

            if(token.status === 200) {
                callAuthlModal()
            }
        } catch (error) {
            if(error.response.status === 400) {
                setErrorLoginPassword({
                    error: true,
                    message: 'Неверный пароль'
                })
            }  else {
                setErrorLoginPassword({
                    error: true,
                    message: 'Что-то пошло не так, попробуйте позже'
                }) 
            }
        }
    }

    let handleClickRegister = async (password) => {
        let userInfo = {
            "username": email,
            "email": email,
            "password": password
        }
        if(validatePassword(password)) {
            setErrorLoginPassword('');
            if(password === repeatPassword) {
                setErrorRepeatPassword('');
                try {
                    let result = await registerUser(userInfo);
                    getUserToken(result.data.jwt);
                    localStorage.setItem('token', result.data.jwt)
            
                    if(result.status === 200) {
                        callAuthlModal()
                    } 
                } catch (error) {
                    console.log(error.response.status);
                }
            }
        } else {
            if(!validatePassword(password)) {
                setErrorLoginPassword({
                    error: true,
                    message: 'Используйте латинские буквы, цифры и спец символы'
                })
            }
            if(password !== repeatPassword) {
                setErrorRepeatPassword({
                    error: true,
                    message: 'Пароли не совпадают'
                })
            }
        }       
    }

    return (
        <div className={styles.modalAuthorization}>
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
                            error={errorLoginPassword}
                            onChange={(e) => {setPassword(e.target.value)}}
                            background={showPassword? openedPassword : hidenPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <div className={styles.errorMessageRegPassword}>{errorLoginPassword? errorLoginPassword.message : ''}</div>
                        <PasswordInput
                            className={styles.modalInput}
                            type={showRepeatPassword? 'text' : 'password'}
                            repeat={true}
                            error={errorRepeatPassword}
                            onChange={(e) => {setRepeatPassword(e.target.value)}}
                            background={showRepeatPassword? openedPassword : hidenPassword}
                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        />
                        <div className={styles.errorMessagePasswordRep}>{errorRepeatPassword? errorRepeatPassword.message : ''}</div>
                        <Button
                            btnClass={styles.modalContinueBtn}
                            btnName='Зарегистрироваться'
                            disabled={password.trim().length === 0 || repeatPassword.trim().length === 0 ? true : false}
                            onClick={() => handleClickRegister(password)}
                        />
                    </>
                    :
                    <>
                    {
                        !emailFound?
                            <>
                            <div className={styles.modalInput}>
                                <input 
                                    className={styles.auth} 
                                    style={{
                                        border: `1px solid ${errorEmail? colors.mainAccent : colors.mainBlack}`
                                    }}
                                    type="email" 
                                    id="email" 
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                                <label className={styles.auth} htmlFor="email">E-mail</label>
                                <div className={styles.errorMessageEmail}>{errorEmail? errorEmail.message : ''}</div>
                            </div>
                            <Button
                                btnClass={styles.modalContinueBtn}
                                btnName='Далее'
                                disabled={email.trim().length === 0? true : false}
                                onClick={() => handleClickEmail(email)}
                            />
                            </>
                            :
                            <>
                            <PasswordInput
                                className={styles.modalInput}
                                type={showPassword? 'text' : 'password'}
                                repeat={false}
                                error={errorLoginPassword}
                                onChange={(e) => {setPassword(e.target.value)}}
                                background={showPassword? openedPassword : hidenPassword}
                                onClick={() => setShowPassword(!showPassword)}
                            /> 
                            <div className={styles.errorMessagePassword}>{errorLoginPassword? errorLoginPassword.message : ''}</div>
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