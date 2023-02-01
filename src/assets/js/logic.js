// export let arrCells = [];

export const params = { moves: 0, time: 0, size: 4, arrCells: [] };

class Results {
  constructor() {
    const results = JSON.parse(localStorage.getItem("results"));
    if (results) {
      this.results = results;
    } else {
      this.results = [];
    }
  }
  addResult(result) {
    if (this.results.length == 10) {
      // сравнить результат последнего
      if (this.results[this.results.length - 1].moves >= result.moves) {
        this.results.splice(-1, 1);
        this.results.push(result);
      }
    } else {
      this.results.push(result);
    }
  }
  saveToLocal() {
    localStorage.setItem(
      "results",
      JSON.stringify(this.sortResults(this.results))
    );
  }
  sortResults(results) {
    return results.sort((a, b) => a.moves - b.moves);
  }
}
export const results = new Results();

export const generateCells = (num) => {
  let condition = false;
  let arr = [];
  const isEqual = () => {
    let indexRow = 1;
    let sum = 0;
    let length = arr.length;
    let max = num * num;
    for (let i = 0; i < length; i++) {
      if (arr[i] == max) {
        indexRow = Math.ceil(i / num);
      } else {
        let kSum = 0;
        for (let j = i + 1; j < length; j++) {
          if (arr[j] != max && arr[j] < arr[i]) kSum++;
        }
        sum += kSum;
      }
    }
    // console.log(sum, num, indexRow);
    return num % 2 == 0
      ? (sum + (num - 1) * (indexRow - 1) + 1) % 2 == 0
      : (sum + (num - 1) * (indexRow - 1) + 1) % 2 != 0;
  };
  do {
    do {
      const newVal = Math.round(Math.random() * (num * num - 1) + 1);
      if (!arr.includes(newVal)) arr.push(newVal);
    } while (arr.length != num * num);

    if (isEqual()) {
      condition = false;
    } else {
      arr = [];
    }
  } while (arr.length == 0);
  let k = 0;
  console.log(arr);

  for (let i = 0; i < num; i++) {
    params.arrCells.push([]);
    for (let j = 0; j < num; j++) {
      params.arrCells[i].push(arr[k++]);
    }
  }
};

export const canMove = (indexCell, indexEmpty) => {
  if ((!indexCell && indexCell !== 0) || (!indexEmpty && indexEmpty !== 0))
    return false;
  const size = localStorage.getItem("size");

  const colEmpty = Math.floor(indexEmpty % size);
  const rowEmpty = Math.floor(indexEmpty / size);

  const colCell = Math.floor(indexCell % size);
  const rowCell = Math.floor(indexCell / size);

  if (Math.abs(rowEmpty - rowCell) + Math.abs(colEmpty - colCell) == 1) {
    params.moves++;
    let temp = params.arrCells[rowCell][colCell];
    params.arrCells[rowCell][colCell] = params.arrCells[rowEmpty][colEmpty];
    params.arrCells[rowEmpty][colEmpty] = temp;
    document.getElementById("moves").innerText = params.moves;
    if (rowCell < rowEmpty) return "to-bottom";
    if (rowCell > rowEmpty) return "to-top";
    if (colCell < colEmpty) return "to-right";
    if (colCell > colEmpty) return "to-left";

    return true;
  }
  return false;
};

export const isFinished = () => {
  let result = true;
  let prev = params.arrCells[0][0];

  for (let i = 0; i < params.size; i++) {
    for (let j = 0; j < params.size; j++) {
      // console.log(prev, arrCells[i][j]);
      if (prev > params.arrCells[i][j]) {
        result = false;
        break;
      }
      prev = params.arrCells[i][j];
    }
    if (!result) break;
  }

  // const res = arrCells.every(
  //   (elem, index, array) => !index || array[index - 1] < elem
  // );

  return result;
};
