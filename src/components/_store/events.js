import { createEffect, createEvent, createStore, sample } from "effector"
import { uploadFile } from "../_axios/requests";


const $events = createStore([]);

export const uploadFilesFX = createEffect(async(files) => {
    let result = await uploadFile(files);
    return result;
});