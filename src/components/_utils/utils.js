import moment from 'moment';
import { uploadFilesFX } from '../_store/events';


export const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const colors = {
    darkGray: '#A4A4A4',
    mainBlack: '#0D0C0C',
    white: '#FFF',
    mainAccent: '#F51B1B'
}

export let getMonthDays = (date) => {
    moment.updateLocale('ru', {week: {dow: 1}});

    let firstDay = date.clone().startOf('month').startOf('week');
    let d = firstDay.clone().subtract(1, 'day');

    let arr = [...Array(42)].map(() => d.add(1, 'day').clone());
    return arr;
}
