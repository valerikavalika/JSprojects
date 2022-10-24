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
console.log (bubbleSort(arr));

//Selection sort
const arr2 =  [8, 12, 1, 5, 2]; 
const selectionSort = arr => {
    for (let i = 0; i < arr.length; i++){
        let lowest = i;
        for (let j = i + 1; j < arr.length;j++) {
            if(arr[j] < arr[lowest]){
            lowest = j;
            }
        }
    if (lowest !== i) {
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
        }
    }
    return arr;
}
console.log (selectionSort(arr2));

//Insertion sort 
const arr3 = [5, 2, 4, 6, 1, 3];
const insertionSort = arr => {
    for(let i = 1; i < arr.length; i++) {
        let currentValue = arr[i];
        let j;
        for(j = i - 1; j >=0 && arr[j] > currentValue; j--) {
            arr[j+1] = arr[j];
        }
        arr[j+1] = currentValue;
    }
    return arr;
}
console.log (insertionSort(arr3));

//quickSort 
const arr4 = [3, 2, 4, 9, 1, 0, 8, 7];
function partition (arr,start,end) {
    const pivotValue = arr[start];
    let swapIndex = start;
    for(let i = start + 1; i <= end; i++){
        if(pivotValue > arr[i]) {
            swapIndex++;
            if(i !== swapIndex) {
                [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
            };
        };  
    };
    if(swapIndex !== start) {
        [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]];
    };
    return swapIndex;
}
const quickSort = (arr, start = 0, end = arr.length - 1) => {
    if(start >= end) {
        return;
    }
    let pivotIndex = partition(arr,start,end);
    quickSort(arr,start,pivotIndex-1);
    quickSort(arr, pivotIndex + 1,end);
    return arr;
}
console.log(quickSort(arr4));

//