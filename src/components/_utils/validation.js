import { uploadFile } from "../_axios/requests";

export function validateFile(files) {
    let errors = []
    
    Array.from(files).forEach((file) => {
        if(file.size > 5000000) {
            let fileError = {
                error: true,
                message: `Размер '${file.name}' превышает 5Мб`,
                fileName: file.name
            }
            errors.push(fileError);
        } 
    });

    return errors;
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

