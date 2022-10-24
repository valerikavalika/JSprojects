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

//