import { createEvent, createStore, sample } from "effector"

const $modalOpened = createStore({
    authlModal: false,
    eventModal: false
});

const controAuthlModal = createEvent();
const controlEventModal = createEvent();

sample({
    clock: controAuthlModal,
    source: $modalOpened,
    fn: (source) => {
        source.authlModal = !source.authlModal;
    },
    target: $modalOpened
})

sample({
    clock: controlEventModal,
    source: $modalOpened,
    fn: (source) => {
        source.eventModal = !source.eventModal;
    },
    target: $modalOpened
})


export const model = {
    $modalOpened,
    controAuthlModal,
    controlEventModal
}