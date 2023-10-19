import styles from '../modalAuth.module.scss'

import { colors } from '@/components/_utils/utils';

function PasswordInput({className, type, repeat,onChange, background, onClick, error}) {
    return (
        <div className={className}>
            <input 
                className={styles.auth} 
                type={type} 
                id={repeat? 'passwordRepeat' : 'password'} 
                onChange={onChange}
                style={{
                    border: `1px solid ${error? colors.mainAccent : colors.mainBlack}`
                }}
                />
            <label className={styles.auth} htmlFor={repeat? 'passwordRepeat' : 'password'}>{repeat? 'Повторите пароль' : 'Пароль'}</label>
            <div 
                className={styles.passwordControl} 
                style={{background: `url(${background})`}}  
                onClick={onClick}>
            </div>
        </div>
    )
}

export default PasswordInput;