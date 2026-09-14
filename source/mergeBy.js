'use strict';

const mergeBy = (arr1, arr2, key) => {
    const ans = new Map();

    for (const obj of arr1) {
        if (obj[key] !== undefined) {
            ans.set(obj[key], {...obj});
        }
    }

    for (const obj of arr2) {
        if (obj[key] !== undefined) {
            if (ans.has(obj[key])) {
                for (const pr in obj){
                    if (pr !== key) {
                        if (Array.isArray(ans.get(obj[key])[pr]) && Array.isArray(obj[pr])) {
                            ans.get(obj[key])[pr] = [...new Set([...ans.get(obj[key])[pr], ...obj[pr]])];
                        } else  if (ans.get(obj[key])[pr] === undefined) {
                            ans.get(obj[key])[pr] = obj[pr];
                        }

                    }
                }
            } else {
                ans.set(obj[key], {...obj});
            }

        }
    }
    return [...ans.values()];
};
