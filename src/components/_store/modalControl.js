import { createEvent, createStore, sample } from "effector"

const $modalBackground = createStore(null);

const $authlModal = createStore(false);
const $eventModal = createStore(false);
const $additionalModal = createStore(false);
const $eventInfoModal = createStore(false);

const controlModalBackground = createEvent();

const callAuthlModal = createEvent();
const callEventModal = createEvent();
const callAdditionalModal = createEvent();
const callEventInfoModal = createEvent();

$modalBackground.on(controlModalBackground, (_, payload) => payload);

$authlModal.on(callAuthlModal, (source) => !source);
$eventModal.on(callEventModal, (source) => !source);
$additionalModal.on(callAdditionalModal, (source) => !source);
$eventInfoModal.on(callEventInfoModal, (source) => !source);

export const model = {
    $modalBackground,
    $authlModal,
    $eventModal,
    $additionalModal,
    $eventInfoModal,
    controlModalBackground,
    callAuthlModal,
    callEventModal,
    callAdditionalModal,
    callEventInfoModal
}