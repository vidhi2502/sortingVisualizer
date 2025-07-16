let array = [];
const container = document.getElementById("bars-container");
const sizeSlider = document.getElementById("size-slider");
const algoSelect = document.getElementById("algo-select");

function generateArray() {
  array = [];
  container.innerHTML = "";
  const size = sizeSlider.value;

  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * 300) + 20;
    array.push(val);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val}px`;
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  const algo = algoSelect.value;
  if (algo === "bubble") await bubbleSort();
  else if (algo === "selection") await selectionSort();
  else if (algo === "insertion") await insertionSort();
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      await sleep(10);
      bars[j].style.background = "#3498db";
      bars[j + 1].style.background = "#3498db";
    }
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[minIdx].style.background = "red";
      bars[j].style.background = "yellow";
      await sleep(10);
      if (array[j] < array[minIdx]) minIdx = j;
      bars[j].style.background = "#3498db";
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[minIdx].style.height = `${array[minIdx]}px`;
    bars[minIdx].style.background = "#3498db";
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      j--;
      await sleep(10);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}

generateArray();
