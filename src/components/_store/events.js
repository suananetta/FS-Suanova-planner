import { createEffect, createEvent, createStore, sample } from "effector"
import { getEventsForPublic, getEventsForLogedUSer } from "../_axios/requests";


const $events = createStore([]);

export const getEventsForPublicFX = createEffect(async() => {
    let result = await getEventsForPublic();
    return result;
});

export const getEventsForLogedUSerFX = createEffect(async() => {
    let result = await getEventsForLogedUSer();
    return result;
});

$events.on(
    getEventsForPublicFX.doneData, (_, result) => result.data.data
)

$events.on(
    getEventsForLogedUSerFX.doneData, (_, result) => result.data.data
)

export const model = {
    $events,
    getEventsForPublicFX,
    getEventsForLogedUSerFX
}