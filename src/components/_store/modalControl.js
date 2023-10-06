import { createEvent, createStore, sample } from "effector"

const $authModal = createStore({
    opened: false,
    registration: false
});

const controlModal = createEvent();
const registerModal = createEvent();

sample({
    clock: controlModal,
    source: $authModal,
    fn: (source) => {
        source.opened = !source.opened;
    },
    target: $authModal
})

sample({
    clock: registerModal,
    source: $authModal,
    fn: (source, payload) => {
        source.registration = payload;
    },
    target: $authModal
})

// sample({
//     clock: closeModal,
//     source: $authModal,
//     fn: (source) => {
//         source.opened = false;
//     },
//     target: $authModal
// })

export const model = {
    $authModal,
    controlModal,

}