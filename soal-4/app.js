function findExpression(numbers, target) {
    let items = numbers.map(n => ({ val: n, str: n.toString() }));

    function solve(currentList) {
        // jika tersisa satu angka, cek apakah sama dengan target
        if (currentList.length === 1) {
            if (currentList[0].val === target) {
                return currentList[0].str;
            }
            return null;
        }

        for (let i = 0; i < currentList.length; i++) {
            for (let j = 0; j < currentList.length; j++) {
                if (i === j) continue;

                const a = currentList[i];
                const b = currentList[j];

                // list baru tanpa a dan b
                const nextList = currentList.filter((_, idx) => idx !== i && idx !== j);

                // Daftar operasi yang mungkin
                const operations = [
                    { val: a.val + b.val, str: `(${a.str} + ${b.str})` },
                    { val: a.val - b.val, str: `(${a.str} - ${b.str})` },
                    { val: a.val * b.val, str: `(${a.str} * ${b.str})` }
                ];

                for (let op of operations) {
                    let result = solve([...nextList, op]);
                    if (result) return result;
                }
            }
        }
        return null;
    }

    const finalResult = solve(items);
    
    // Membersihkan tanda kurung terluar jika ada
    if (finalResult && finalResult.startsWith('(') && finalResult.endsWith(')')) {
        return finalResult.slice(1, -1);
    }
    
    return finalResult || "Tidak ditemukan solusi";
}

console.log("Target 16:", findExpression([1, 4, 5, 6], 16)); 
console.log("Target 18:", findExpression([1, 4, 5, 6], 18)); 
console.log("Target 50:", findExpression([1, 4, 5, 6], 50));
console.log("Target 100:", findExpression([1, 4, 5, 6], 100));