const arr1 = [3, 0, 2, 4] // 1
const arr2 = [3106, 3102, 3104, 3105, 3107] // 3103
const arr3 = [105, 106, 102, 103, 107] // 104

const sortArray = (arr) => {
    return arr.sort((a, b) => a - b)
}

// cari nomor yang hilang dari dalam array
const findMissingNumber = (arr) => {
    const sortedArray = sortArray(arr)
    const firstNumber = sortedArray[0]

    for(let number = firstNumber; number <= sortedArray[sortedArray.length - 1]; number++) {
        if(!sortedArray.includes(number)) {
            return number
        }
    }
}

console.log(findMissingNumber(arr1))
console.log(findMissingNumber(arr2))
console.log(findMissingNumber(arr3))