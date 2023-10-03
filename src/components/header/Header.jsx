import styles from './header.module.scss'

import Link from "next/link"
import Image from "next/image"
import Button from "../_shared/Button/Button"

function Header() {
    let arrowBack = <Image src="/arrow-back.svg" width={32} height={32} alt="arrow back" />;
    let arrowForward = <Image src="/arrow-forward.svg" width={32} height={32} alt="arrow forward" />;

    return (
        <header>
            <div className={styles.headerIntro}>
                <div className={styles.logo}>
                    <Image src="/logo.svg" width={53} height={31} alt="logo red collar" />
                    <span>red collar</span>
                </div>
                <h1 className={styles.title}>planner <span>event</span></h1>
            </div>
            <div className={styles.headerControls}>
                <div className={styles.monthControls}>
                    <span className={styles.month}>Сентябрь</span>
                    
                    <Button
                    btnClass={styles.arrowBackBtn}
                    btnName={arrowBack}
                    disabled={false}
                    // onClick
                    />
                    <Button
                    btnClass={styles.arrowForwardBtn}
                    btnName={arrowForward}
                    disabled={false}
                    // onClick
                    />
                </div>
                <Button
                    btnClass={styles.authorizationBtn}
                    btnName='Войти'
                    disabled={false}
                    // onClick
                />
            </div>
        </header>
    )
}

export default Header;