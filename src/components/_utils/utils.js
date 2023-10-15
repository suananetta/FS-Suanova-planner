import moment from 'moment';
import { uploadFile } from '../_axios/requests';

export let getMonthDays = (date) => {
    moment.updateLocale('ru', {week: {dow: 1}});

    let firstDay = date.clone().startOf('month').startOf('week');
    let d = firstDay.clone().subtract(1, 'day');

    let arr = [...Array(42)].map(() => d.add(1, 'day').clone());
    return arr;
}

export let uploadFiles = async(files) => {
    let formData = new FormData();

    Array.from(files).forEach((file) => {
        formData.append('files', file);         
    })

    formData.getAll('files').forEach((file) => {
        uploadFile(file).then(res => console.log(res));    
    });
}