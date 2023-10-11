import { createEffect, createEvent, createStore, sample } from "effector"
import { checkUserExistence, loginUser, registerUser, getUserInfo, getAllUsers} from "../_axios/requests";

const $userToken = createStore(null);
const $userName = createStore('User');

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
    return result.data.username;
});

const getAllUsersFx = createEffect(async() => {
    let result = await getAllUsers();
    return result.data;
});

let getUserToken = createEvent();
let getUserName = createEvent();

$userName.on(getUserName, (_, payload) => payload)

sample({
    clock: getUserToken,
    source: $userToken,
    fn: (source, payload) => {
        source = payload;
    },
    target: $userToken
})

// sample({
//     clock: getUserName,
//     source: $userName,
//     fn: (source, payload) => {
//         return payload;
//     },
//     target: $userName
// })

export const model = {
    $userToken,
    $userName,
    checkUserFx,
    loginUserFx,
    registerUserFx,
    getUserInfoFx,
    getAllUsersFx,
    getUserToken,
    getUserName
}