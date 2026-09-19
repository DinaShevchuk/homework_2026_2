'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob"}
        ]);
    });

    QUnit.test("Работает правильно с дубликатами в слиянии ", function(assert) {
        const array1 = [
            {id: 1, tags: ["Alice", "Bob"] }
        ];
        const array2 = [
            {id: 1, tags: ["Bob", "Sam"] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, tags: ["Alice", "Bob", "Sam"] }
        ]);
    });

    QUnit.test("Работает правильно с дубликатами ключа в одном массиве ", function(assert) {
        const array1 = [
            {id: 1, name: "Alice"}, {id:1, age: 23}
        ];

        const array2 = [
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", age: 23 }
        ]);
    });

    QUnit.test("Работает правильно с не массивами ", function(assert) {
        assert.throws(
            () => mergeBy("abc", [], "id"),
            (err) => err instanceof TypeError && /arr1 должен быть массивом/.test(err.message)
        );
        assert.throws(
            () => mergeBy({}, [], "id"),
            (err) => err instanceof TypeError && /arr1 должен быть массивом/.test(err.message)
        );
        assert.throws(
            () => mergeBy([], null, "id"),
            (err) => err instanceof TypeError && /arr2 должен быть массивом/.test(err.message)
        );
    });

    QUnit.test("Работает правильно с если ошибка в ключе ", function(assert) {
        assert.throws(
            () => mergeBy([], [], ""),
            (err) => err instanceof TypeError && /key должен быть не пустой строкой/.test(err.message)
        );
        assert.throws(
            () => mergeBy([], [], 5),
            (err) => err instanceof TypeError && /key должен быть не пустой строкой/.test(err.message)
        );
        assert.throws(
            () => mergeBy([], [], null),
            (err) => err instanceof TypeError && /key должен быть не пустой строкой/.test(err.message)
        );
    });

});
