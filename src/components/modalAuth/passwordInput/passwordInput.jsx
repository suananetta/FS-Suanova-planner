import styles from '../modalAuth.module.scss'

function PasswordInput({className, type, repeat,onChange, background, onClick}) {

    return (
        <div className={className}>
            <input className={styles.auth} type={type} id={repeat? 'passwordRepeat' : 'password'} onChange={onChange}/>
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