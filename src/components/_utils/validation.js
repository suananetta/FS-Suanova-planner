
export function validateEmail(email) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(email)) {
		return true;
	} else {
		return false;
	}
}


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

let timeMask = (value) => {
    if(value.match(/^\d{2}$/) !== null) {
        value = value + ':';
    }

    value = value.replace(/[^\dh:]/, "");
    value = value.replace(/^[^0-2]/, "");
    value = value.replace(/^([2-9])[4-9]/, "$1");
    value = value.replace(/^\d[:h]/, "");
    value = value.replace(/^([01][0-9])[^:h]/, "$1");
    value = value.replace(/^(2[0-3])[^:h]/, "$1");      
    value = value.replace(/^(\d{2}[:h])[^0-5]/, "$1");
    value = value.replace(/^(\d{2}h)./, "$1");      
    value = value.replace(/^(\d{2}:[0-5])[^0-9]/, "$1");
    value = value.replace(/^(\d{2}:\d[0-9])./, "$1");

    return value;
}

export function validateTime(e) {
    let val = e.target.value;
    let lastLength;
    
    do {
      lastLength = val.length;
      val = timeMask(val);
    } while (val.length > 0 && lastLength !== val.length);

    e.target.value = val;
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

