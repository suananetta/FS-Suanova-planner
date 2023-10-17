import { createEvent, createStore, sample } from "effector"

const $modalOpened = createStore({
    authlModal: false,
    eventModal: false,
    additionalModal: false
});

const $modalBackground = createStore(null);
const $additionalModal = createStore(false);

const controAuthlModal = createEvent();
const controlEventModal = createEvent();
const controlModalBackground = createEvent();
const callAdditionalModal = createEvent();
const controlAdditionalModal = createEvent();

$modalBackground.on(controlModalBackground, (_, payload) => payload)
$additionalModal.on(callAdditionalModal, (source) => !source)

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

sample({
    clock: controlAdditionalModal,
    source: $modalOpened,
    fn: (source) => {
        source.additionalModal = !source.additionalModal;
    },
    target: $modalOpened
})

export const model = {
    $modalOpened,
    $modalBackground,
    $additionalModal,
    controAuthlModal,
    controlEventModal,
    controlModalBackground,
    callAdditionalModal,
    controlAdditionalModal
}