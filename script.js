//Bubble sort
const arr = [5, 10, 4, 1, 8];

const bubbleSort = arr => {
    const arrLength = arr.length;
    const swap = (arr, left, right) => {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
    };
    for (let i = 0; i < arrLength; i++) {
        for(let j = 0; j < arrLength - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
    return arr;
};

//Selection sort
