import { createEffect, createEvent, createStore, sample } from "effector"
import { checkUserExistence, loginUser, registerUser, getUserInfo} from "../_axios/requests";

const $userToken = createStore(null);

const checkUserFx = createEffect(async(email) => {
    let result = await checkUserExistence(email);
    return result;  
});

const loginUserFx = createEffect(async(userInfo) => {
    let result = await loginUser(userInfo.email, userInfo.password);
    return result;
});

const registerUserFx = createEffect(async(userInfo) => {
    let result = await registerUser(userInfo.username, userInfo.email, userInfo.password);
    return result;
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
    registerUserFx,
    getUserToken
}