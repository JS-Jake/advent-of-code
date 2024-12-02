function loadInputFile() {
  console.log("Loading input file");
  const input = Deno.readTextFileSync("2024/02/input.txt");
  return input;
}

function isDecreasing(firstVal: number, secondVal: number) {
  return firstVal > secondVal;
}

function isAcceptableDifference(largerVal: number, smallerVal: number) {
  return [1, 2, 3].includes(largerVal - smallerVal);
}

function convertFileToRows(input: string) {
  console.log("Converting file to rows");
  return input.split("\n").map((row) => row.split(" "));
}

function isRowSafe(row: string[]): boolean {
  const ruleOne: Array<boolean> = [];
  const ruleTwo: Array<boolean> = [];
  row.forEach((val, i) => {
    if (i === row.length - 1) return;
    if (isDecreasing(Number(val), Number(row[i + 1]))) {
      ruleOne.push(true);
      ruleTwo.push(isAcceptableDifference(Number(val), Number(row[i + 1])));
    } else {
      ruleOne.push(false);
      ruleTwo.push(isAcceptableDifference(Number(row[i + 1]), Number(val)));
    }
  });
  return (
    ruleOne.every((val) => val === ruleOne[0]) &&
    ruleTwo.every((val) => val === true)
  );
}

function checkIfSafe() {
  const input = loadInputFile();
  const rows = convertFileToRows(input);
  let safeRows = 0;
  for (const row of rows) {
    if (isRowSafe(row)) {
      console.log(`Row ${row} is safe`);
      safeRows++;
    } else {
      console.log(`Row ${row} is not safe`);
      let rowBecameSafe = false;
      for (let i = 0; i < row.length; i++) {
        const modifiedRow = row.slice(0, i).concat(row.slice(i + 1));
        if (isRowSafe(modifiedRow)) {
          console.log(
            `Row ${row} becomes safe by removing element at index ${i} value: ${row[i]}`
          );
          rowBecameSafe = true;
          safeRows++;
          break;
        }
      }
      if (!rowBecameSafe) {
        console.log(
          `Row ${row} cannot be made safe by removing a single element`
        );
      }
    }
  }
  console.log(`Safe rows: ${safeRows}`);
}

checkIfSafe();
