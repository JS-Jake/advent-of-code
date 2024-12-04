function loadInputFile() {
  console.log("Loading input file");
  const input = Deno.readTextFileSync("2024/03/input.txt");
  return input;
}

function getMuls(input: string) {
  console.log("Extracting multiples from input");
  const regex = /mul\(\d{1,3},\d{1,3}\)/gm;
  const matches = input.match(regex);
  return matches!;
}

function getValuesToMultiply(muls: RegExpMatchArray) {
  const vals: Array<number[]> = [];
  const regex = /\d+/gm;
  for (const mul of muls) {
    const matches = mul.match(regex);
    if (matches) {
      vals.push(matches.map(Number));
    }
  }
  return vals;
}

function multiplyValues(vals: number[]) {
  return vals.reduce((acc, val) => acc * val);
}

function main() {
  const input = loadInputFile();
  const muls = getMuls(input);
  console.log(muls);
  const vals = getValuesToMultiply(muls);
  console.log(vals);
  const multipliedVals = vals.map(multiplyValues);
  console.log(multipliedVals);
  const sum = multipliedVals.reduce((acc, val) => acc + val);
  console.log(sum);
}

main();
