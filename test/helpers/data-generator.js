import Chance from 'chance';
export const chance = new Chance();

export const INTEGER_RANGE = {min: 1, max: 10};

export function randomListOfStrings() {
    const
        list = [],
        listSize = chance.natural(INTEGER_RANGE, {min: 3});

    for (let i = 0; i < listSize; i += 1) {
        list.push(chance.string());
    }

    return list;
}
