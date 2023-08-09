const permutationsValue = (arr: Array<any>): any => {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(
        (acc, item, i) =>
            acc.concat(
                permutationsValue([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val: any) => [
                    item,
                    ...val,
                ])
            ),
        []
    );
};

export function permutations<T>(arr: Array<T>): Array<Array<T>> {
    return permutationsValue(arr);
}

export function genMatrixMask(rows: number, collumes: number, waits: Array<number>) {
    const arr: Array<Array<number>> = Array.from(Array(collumes), () => []);
    for (let i = 0; i < collumes; i++) {
        arr[i] = constructMatrixMaskCollumes(rows, waits[i], i, collumes)
    }
    return arr;
}

function constructMatrixMaskCollumes(rows: number, wait: number | undefined, index: number, length: number) {
    const arr: Array<number> = new Array(rows).fill(0);
    const waited = wait ? wait : 1 / length * 100;
    arr[index] = waited / 100;
    return arr;
}

export function getShape2d<T>(arr: Array<Array<T>>) {
    if (arr.length == 0) return {
        collumes: 0,
        rows: 0
    }
    return {
        collumes: arr.length,
        rows: arr[0].length
    }
}

export function multiplyMatrix2D(matrix1: Array<Array<number>>, matrix2: Array<Array<number>>) {
    const matrix: Array<Array<number>> = [];
    matrix1.forEach((value, index) => {
        matrix.push(multiplyMatrix2DRow(value, matrix2[index]));
    })
    return matrix;
}

function multiplyMatrix2DRow(row1: Array<number>, row2: Array<number>) {
    const arr: Array<number> = [];
    row1.forEach((value, index) => {
        arr.push(value * row2[index])
    });
    return arr;
}

/*export function matrix2DColapse(matrix: Array<Array<number>>) {
    const arr: Array<number> = [];
    matrix.forEach((value) => {
        arr.push(getNotNullValue(value));
    })
    return arr;
}

export function getNotNullValue(arr: Array<number>) {
    arr.forEach((value) => {
        if (value != 0) return value;
    });
    return 0;
}*/

export function sumMatrix2D(matrix: Array<Array<number>>) {
    let sum = 0;
    matrix.forEach(col => {
        sum += sumMatrix2DRow(col);
    });
    return sum;
}

export function sumMatrix2DRow(row: Array<number>) {
    let sum = 0;
    row.forEach(num => {
        sum += num;
    });
    return sum;
}