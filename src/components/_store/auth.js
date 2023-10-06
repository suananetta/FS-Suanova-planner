import { createEffect, createEvent, createStore, sample } from "effector"
import { checkUserExistence, loginUser} from "../_axios/requests";

const $userToken = createStore(null);

const checkUserFx = createEffect(async(email) => {
    let result = await checkUserExistence(email);
    if(result.status === 204) {
        return false
    } else {
        return true
    };
});

const loginUserFx = createEffect(async(email, password) => {
    let result = await loginUser(email, password);
    return result.data.jwt;
});

let getUserToken = createEvent();

sample({
    clock: getUserToken,
    source: $userToken,
    fn: (source, payload) => {
        source = payload;
    },
    target: $userToken
})

export const model = {
    $userToken,
    checkUserFx,
    loginUserFx,
    getUserToken
}