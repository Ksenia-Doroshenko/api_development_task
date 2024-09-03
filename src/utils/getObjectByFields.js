export function getObjectByFields(obj, fields) {
    const res = {};
    for (let i = 0; i < fields.length; i++) {
        res[fields[i]] = obj[fields[i]];
    }
    return res;
}