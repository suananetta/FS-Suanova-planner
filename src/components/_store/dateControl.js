import { createEvent, createStore, sample } from "effector"
import moment from "moment"
import "moment/locale/ru"

const $currentDate = createStore(moment());
const $customDate = createStore(null);

const prevMonth = createEvent();
const nextMonth = createEvent();
const setCustomDate = createEvent();

$customDate.on(setCustomDate, (_, payload) => payload)

sample({
    clock: prevMonth,
    source: $currentDate,
    fn: (source) => {
        source.subtract(1, 'month');
    },
    target: $currentDate
})

sample({
    clock: nextMonth,
    source: $currentDate,
    fn: (source) => {
        source.add(1, 'month');
    },
    target: $currentDate
})

export const model = {
    $currentDate,
    $customDate,
    prevMonth,
    nextMonth,
    setCustomDate
}