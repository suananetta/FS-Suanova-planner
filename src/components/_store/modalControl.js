import { createEvent, createStore, sample } from "effector"

const $modalBackground = createStore(null);

const $authlModal = createStore(false);
const $eventModal = createStore(false);
const $additionalCreateEventModal = createStore(false);
const $additionalEvenInfoModal = createStore(false);
const $additionalEvenLeaveModal = createStore(false);
const $eventInfoModal = createStore(false);

const controlModalBackground = createEvent();

const callAuthlModal = createEvent();
const callEventModal = createEvent();
const callAdditionalCreateEventModal = createEvent();
const callAdditionalEvenInfoModal = createEvent();
const callAdditionalEvenLeaveModal = createEvent();
const callEventInfoModal = createEvent();

$modalBackground.on(controlModalBackground, (_, payload) => payload);

$authlModal.on(callAuthlModal, (source) => !source);
$eventModal.on(callEventModal, (source) => !source);
$additionalCreateEventModal.on(callAdditionalCreateEventModal, (source) => !source);
$additionalEvenInfoModal.on(callAdditionalEvenInfoModal, (source) => !source);
$additionalEvenLeaveModal.on(callAdditionalEvenLeaveModal, (source) => !source);
$eventInfoModal.on(callEventInfoModal, (source) => !source);

export const model = {
    $modalBackground,
    $authlModal,
    $eventModal,
    $additionalCreateEventModal,
    $eventInfoModal,
    $additionalEvenInfoModal,
    $additionalEvenLeaveModal,
    controlModalBackground,
    callAuthlModal,
    callEventModal,
    callAdditionalCreateEventModal,
    callEventInfoModal,
    callAdditionalEvenInfoModal,
    callAdditionalEvenLeaveModal
}