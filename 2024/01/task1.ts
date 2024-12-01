function loadInputFile() {
    console.log('Loading input file');
    const input = Deno.readTextFileSync('2024/01/input.txt');
    return input;
}

function convertFileToRows(input: string) {
    console.log('Converting file to rows');
    return input.split('\n');
}

function splitRowsToCols(rowInput: string[]) {
    console.log('Splitting rows to columns');
    const rows = rowInput.map(row => row.split('   ').map(Number));
    const left = rows.map(row => row[0]).sort((a, b) => a-b);
    const right = rows.map(row => row[1]).sort((a, b) => a-b);
    console.log(`left has: ${left.length} rows, right has ${right.length} rows`);
    return { left, right };
}

function calculateDistance(left: number[], right: number[]) {
    console.log('Calculating distance');
    let dist: number[] = [];
    left.forEach((_l, i) => {
        dist.push(left[i]-right[i])
})
    dist = dist.map(d => d < 0 ? d*-1 : d);
    const totalDist = dist.reduce((acc, curr) => acc+curr, 0);
    return totalDist;
}

function main() {
    const input = loadInputFile();
    const rows = convertFileToRows(input);
    const { left, right } = splitRowsToCols(rows);
    const totalDist = calculateDistance(left, right);
    console.log(`Total distance: ${totalDist}`);
}

main();
