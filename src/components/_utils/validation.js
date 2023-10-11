import { uploadFile } from "../_axios/requests";

export async function validateFile(e) {
    let files;
    let error = {
        error: false,
        message: ''
    };

    if(e.target.files) {
        files = e.target.files;
    } else {
        files = e.dataTransfer.files;
    }

    Array.from(files).forEach((file) => {
        if(file.size > 5000000) {
            error.error = true;
            error.message = 'Размер фото не может превышать 5Мб';
        } else {
            error.error = false;
            error.message = '';
        }
    });

    return error;
}


export function validateDate(start, end) {
    let startD = new Date(start);
    let endD = new Date(end);
    let now = new Date();
    let error;

    if (startD.getTime() > now.getTime()) {
        error = 'Дата не может быть больше текущей';
        return error;
    } else if(endD.getTime() < startD.getTime()) {
        error = 'Дата начала не может быть больше даты окончания';
        return error;
    } else {
        return true;
    }
}

