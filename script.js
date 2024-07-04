var n = 25,
  count = 0;
let array = [];
let audioCtx = null;
var slider = document.getElementById("myRange");

n = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  n = this.value;
};
init();

function play() {
  const coppy = [...array];
  let moves;
  var obj = document.getElementById("Selected");
  const value = obj.options[obj.selectedIndex].value;
  // console.log(value);
  switch (value) {
    case "selection":
      // console.log(value);
      moves = selectionSort(coppy);
      break;
    case "Bubble":
      // console.log(value);
      moves = BubbleSort(coppy);
      break;
    default:
      alert("choose sorting algorithm");
      break;
  }
  animate(moves);
  showBar();
}

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContex ||
      window.webkitAudioContex)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function init() {
  container.innerHTML = "";
  array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.abs(Math.random());
  }
  showBar();
}

function mergeSort(params) {}

function selectionSort(array) {
  const moves = [];
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i; j < array.length; j++) {
      moves.push({ indices: [min, j], type: "comp" });
      if (array[min] > array[j]) {
        min = j;
      }
    }
    moves.push({ indices: [min, i], type: "swap" });
    [array[min], array[i]] = [array[i], array[min]];
  }
  showBar();
  return moves;
}

function BubbleSort(array) {
  const moves = [];
  do {
    var swwaped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swwaped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swwaped);
  showBar();
  return moves;
}

function showBar(move) {
  container.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
    }
    container.appendChild(bar);
  }
}

function animate(moves) {
  if (moves.length == 0) {
    showBar();
    return;
  }
  const move = moves.shift();

  const [i, j] = move.indices;
  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }
  playNote(200 + array[i] * 500);
  playNote(200 + array[j] * 500);
  showBar(move);
  setTimeout(() => {
    animate(moves);
  }, 50);
}
