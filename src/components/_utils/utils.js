import Image from 'next/image';
import moment from 'moment';

export const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const colors = {
    darkGray: '#A4A4A4',
    mainBlack: '#0D0C0C',
    white: '#FFF',
    mainAccent: '#F51B1B',
    buttonsGray: '#EFEFEF'
}

export const BASE_URL = 'http://localhost:1337';

export let arrowBack = <Image src="/arrow-back.svg" width={32} height={32} alt="arrow back" />;
export let arrowForward = <Image src="/arrow-forward.svg" width={32} height={32} alt="arrow forward" />; 

export let getMonthDays = (date) => {
    moment.updateLocale('ru', {week: {dow: 1}});

    let firstDay = date.clone().startOf('month').startOf('week');
    let d = firstDay.clone().subtract(1, 'day');

    let arr = [...Array(42)].map(() => d.add(1, 'day').clone());
    return arr;
}
