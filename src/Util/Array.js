export function sort_pair(origArray) {
    if (origArray.length <= 2) {
        return origArray;
    } else {
        var left = [];
        var right = [];
        var newArray = [];
        var pivot2 = origArray.pop();
        var pivot = origArray.pop();
        var length = origArray.length;

        for (var i = 0; i < length; i = i + 2) {
            if (origArray[i] <= pivot) {
                left.push(origArray[i]);
                left.push(origArray[i + 1]);
            } else {
                right.push(origArray[i]);
                right.push(origArray[i + 1]);
            }
        }

        return newArray.concat(sort_pair(left), pivot, pivot2, sort_pair(right));
    }
}


export function indexOf_pair(array, number) {
    if (array.length > 1) {
        length = array.length;
        for (let i = 0; i < length; i = i + 2) {
            if (array[i] == number) {
                return i
            }
        }
        return -1
    }
}