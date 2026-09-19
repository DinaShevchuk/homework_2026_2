'use strict';

/**
 * Проверяет, что значение является массивом.
 *
 * @param {*} value — проверяемое значение
 * @param {string} name — имя аргумента для сообщения об ошибке
 * @throws {TypeError} если значение не является массивом
 */
const assertArray = (value, name) => {
    if (!Array.isArray(value)) {
        throw new TypeError(`mergeBy: ${name} должен быть массивом`);
    }
};

/**
 * Проверяет, что ключ — непустота.
 *
 * @param {*} value — проверяемое значение ключа
 * @throws {TypeError} если ключ не является непустой строкой
 */
const assertKey = (value) => {
    if (typeof value !== 'string' || value.length === 0) {
        throw new TypeError('mergeBy: key должен быть не пустой строкой');
    }
};

/**
 * Сливает свойства `source` в `target` (мутирует `target`).
 * Массивы объединяются без дубликатов, остальные свойства
 * заполняются только тогда, когда в `target` их ещё нет.
 * Свойство `key` не копируется.
 *
 * @param {Object} target — объект, в который сливаем
 * @param {Object} source — объект-источник
 * @param {string} key — ключ сопоставления, не копируется
 * @returns {Object} тот же `target` после слияния
 */
const mergeInto = (target, source, key) => {
    for (const [prop, value] of Object.entries(source)) {
        if (prop === key) {
            continue;
        }
        const current = target[prop];
        if (Array.isArray(current) && Array.isArray(value)) {
            target[prop] = [...new Set([...current, ...value])];
        } else if (current === undefined) {
            target[prop] = value;
        }
    }
    return target;
};

/**
 * Объединяет два массива объектов по значению ключа `key`.
 *
 * @param {Array<Object>} arr1 — первый массив объектов
 * @param {Array<Object>} arr2 — второй массив объектов
 * @param {string} key — имя свойства для сопоставления
 * @returns {Array<Object>} новый массив объединённых объектов
 * @throws {TypeError} если arr1/arr2 не массивы, либо key не непустая строка
 */
const mergeBy = (arr1, arr2, key) => {
    assertArray(arr1, 'arr1');
    assertArray(arr2, 'arr2');
    assertKey(key);

    const addToMap = (map, obj) => {
        if (obj === null || typeof obj !== 'object') {
            return map;
        }
        const id = obj[key];
        if (id === undefined) {
            return map;
        }
        if (map.has(id)) {
            mergeInto(map.get(id), obj, key);
        } else {
            map.set(id, { ...obj });
        }
        return map;
    };

    const ans = [...arr1, ...arr2].reduce(addToMap, new Map());

    return [...ans.values()];
};
