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

function checkIfSafe() {
  const input = loadInputFile();
  const rows = convertFileToRows(input);
  let safeRows = 0;
  for (const row of rows) {
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
    if (ruleOne.every((val) => val === ruleOne[0])) {
      if (ruleTwo.every((val) => val === true)) {
        console.log(`Row ${row} is safe`);
        safeRows++;
        continue;
      }
    }
    console.log(`Row ${row} is not safe`);
  }
  console.log(`Safe rows: ${safeRows}`);
}

checkIfSafe();
