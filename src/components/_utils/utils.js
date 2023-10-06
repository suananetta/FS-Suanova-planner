import moment from 'moment'

export let getMonthDays = (date) => {
    moment.updateLocale('ru', {week: {dow: 1}});

    let firstDay = date.clone().startOf('month').startOf('week');
    let d = firstDay.clone().subtract(1, 'day');

    let arr = [...Array(42)].map(() => d.add(1, 'day').clone());
    return arr;
}