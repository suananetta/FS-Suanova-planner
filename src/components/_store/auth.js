import { createEffect, createEvent, createStore, sample } from "effector"
import { checkUserExistence, loginUser, registerUser, getUserInfo, getAllUsers} from "../_axios/requests";

const $userToken = createStore(null);
const $userInfo = createStore('User');

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

const getUserInfoFx = createEffect(async() => {
    let result = await getUserInfo();
    return result.data;
});

const getAllUsersFx = createEffect(async() => {
    let result = await getAllUsers();
    return result.data;
});

let getUserToken = createEvent();
// let getUserName = createEvent();

$userInfo.on(getUserInfoFx.doneData, (_, result) => result)

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
    $userInfo,
    checkUserFx,
    loginUserFx,
    registerUserFx,
    getUserInfoFx,
    getAllUsersFx,
    getUserToken,
}