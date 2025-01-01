const ShogiPieces = {
  // 駒固有のID
  id: "",
  // 駒の表裏の状態
  state: "",
  // 駒の表
  front: "",
  // 駒の裏
  back: "",
  // 駒の持ち主
  owner: "",
  // 今いる地点
  position: "",
};
// 駒の設定情報
const INIT_STATE = "front";
// 王、玉の設定
const kingConf = {
  front: "ou",
  back: "",
  frontImage: "",
  backImage: "",
  counter: 1,
  positionConf: {
    "ou": ["five-one"],
    "gyoku": ["five-nine"]
  }
};
// 金の設定
const kinConf = {
  front: "kin",
  back: "",
  frontImage: "",
  backImage: "",
  counter: 2,
  positionConf: {
    "ou": ["six-one", "four-one"],
    "gyoku": ["six-nine", "four-nine"]
  }
};
// 銀の設定
const ginConf = {
  front: "gin",
  back: "narigin",
  frontImage: "",
  backImage: "",
  counter: 2,
  positionConf: {
    "ou": ["seven-one", "three-one"],
    "gyoku": ["seven-nine", "three-nine"]
  }
};
// 飛車の設定
const hisyaConf = {
  front: "hisya",
  back: "ryuo",
  frontImage: "",
  backImage: "",
  counter: 1,
  positionConf: {
    "ou": ["seven-two"],
    "gyoku": ["three-eight"]
  }
};
// 角の設定
const kakuConf = {
  front: "kaku",
  back: "ryuma",
  frontImage: "",
  backImage: "",
  counter: 1,
  positionConf: {
    "ou": ["three-two"],
    "gyoku": ["seven-eight"]
  }
};
// 桂馬の設定
const keimaConf = {
  front: "keima",
  back: "narikei",
  frontImage: "",
  backImage: "",
  counter: 2,
  positionConf: {
    "ou": ["eight-one", "two-one"],
    "gyoku":["eight-nine", "two-nine"]
  }
};
// 香車の設定
const kyosyaConf = {
  front: "kyosya",
  back: "narikyo",
  frontImage: "",
  backImage: "",
  counter: 2,
  positionConf: {
    "ou": ["nine-one", "one-one"],
    "gyoku": ["nine-nine", "one-nine"]
  }
};
// 歩の設定
const hoConf = {
  front: "ho",
  back: "tokin",
  frontImage: "",
  backImage: "",
  counter: 9,
  positionConf: {
    "ou": ["nine-three", "eight-three", "seven-three", "six-three", "five-three", "four-three", "three-three", "two-three", "one-three"],
    "gyoku": ["nine-seven", "eight-seven", "seven-seven", "six-seven", "five-seven", "four-seven", "three-seven", "two-seven", "one-seven"]
  }
};
// 王、玉
let owners = ["ou", "gyoku"];

// 駒生成関数
const generater = (conf, owner) => {
  for (let i = 0; i < conf.counter; i++) {
    let piece = { ...ShogiPieces };
    piece.id = Math.floor(Math.random() * 1000);
    piece.state = INIT_STATE;
    piece.front = conf.front;
    piece.back = conf.back;
    piece.owner = owner;
    const map = new Map(Object.entries(conf.positionConf));
    piece.position = map.get(owner)[i];
    divideOwner(owner, piece);
  }
};
// 駒の初期配置設定
const initPosition = (piece) => {
  let result = "";

}

// 駒振り分け関数
const divideOwner = (owner, piece) => {
  if ("ou" === owner) {
    ouOwnerPieces.push(piece);
  } else {
    gyokuOwnerPieces.push(piece);
  }
};

// ターン管理変数
let turnManagement = "";
// 盤面管理配列
let boardManagement = [];
// 王側所有駒管理配列
let ouOwnerPieces = [];
// 玉側所有駒管理配列
let gyokuOwnerPieces = [];

// 駒生成処理
const generatePieces = () => {
  // console.log("駒の生成を始めます");
  for (owner of owners) {
    // 王、玉
    generater(kingConf, owner);
    // 金
    generater(kinConf, owner);
    // 銀
    generater(ginConf, owner);
    // 飛車
    generater(hisyaConf, owner);
    // 角
    generater(kakuConf, owner);
    // 桂馬
    generater(keimaConf, owner);
    // 香車
    generater(kyosyaConf, owner);
    // 歩
    generater(hoConf, owner);
  }
};

// 盤面に駒を置く
const putPiece = (piece) => {
  const positionJPN = piece.position;
  const [i, j] = getPiecePosition(piece);
  let displayPosition = document.getElementById(positionJPN);
  displayPosition.innerHTML = piece.front;
}

// 駒を初期位置へ配置する
const setUpPieces = () => {
  // 王の駒を並べる
  for (piece of ouOwnerPieces) {
    if ("ou" === piece.front) {
      // 5一へ配置
      boardManagement[0].splice(4, 1, piece);
      putPiece(piece);
    } else if ("kyosya" === piece.front) {
      if (isEmpty(boardManagement[0][0])) {
        // 9一へ配置
        boardManagement[0].splice(0, 1, piece);
        putPiece(piece);
      } else {
        // 1一へ配置
        boardManagement[0].splice(8, 1, piece);
        putPiece(piece);
      }
    } else if ("keima" === piece.front) {
      if (isEmpty(boardManagement[0][1])) {
        // 8一へ配置
        boardManagement[0].splice(1, 1, piece);
        putPiece(piece);
      } else {
        // 2一へ配置
        boardManagement[0].splice(7, 1, piece);
        putPiece(piece);
      }
    } else if ("gin" === piece.front) {
      if (isEmpty(boardManagement[0][2])) {
        // 7一へ配置
        boardManagement[0].splice(2, 1, piece);
        putPiece(piece);
      } else {
        // 3一へ配置
        boardManagement[0].splice(6, 1, piece);
        putPiece(piece);
      }
    } else if ("kin" === piece.front) {
      if (isEmpty(boardManagement[0][3])) {
        // 6一へ配置
        boardManagement[0].splice(3, 1, piece);
        putPiece(piece);
      } else {
        // 4一へ配置
        boardManagement[0].splice(5, 1, piece);
        putPiece(piece);
      }
    } else if ("kaku" === piece.front) {
      // 8二へ配置
      boardManagement[1].splice(1, 1, piece);
      putPiece(piece);
    } else if ("hisya" === piece.front) {
      // 2二へ配置
      boardManagement[1].splice(7, 1, piece);
      putPiece(piece);
    } else if ("ho" === piece.front) {
      if (isEmpty(boardManagement[2][0])) {
        boardManagement[2].splice(0);
        putPiece(piece);
      }
      // 9三～9三へ配置する
      boardManagement[2].push(piece);
      putPiece(piece);
    }
  }
  // 玉の駒を並べる
  for (piece of gyokuOwnerPieces) {
    if ("ou" === piece.front) {
      // 5九へ配置
      boardManagement[8].splice(4, 1, piece);
      putPiece(piece);
    } else if ("kyosya" === piece.front) {
      if (isEmpty(boardManagement[8][0])) {
        // 9九へ配置
        boardManagement[8].splice(0, 1, piece);
        putPiece(piece);
      } else {
        // 1九へ配置
        boardManagement[8].splice(8, 1, piece);
        putPiece(piece);
      }
    } else if ("keima" === piece.front) {
      if (isEmpty(boardManagement[8][1])) {
        // 8九へ配置
        boardManagement[8].splice(1, 1, piece);
        putPiece(piece);
      } else {
        // 2九へ配置
        boardManagement[8].splice(7, 1, piece);
        putPiece(piece);
      }
    } else if ("gin" === piece.front) {
      if (isEmpty(boardManagement[8][2])) {
        // 7九へ配置
        boardManagement[8].splice(2, 1, piece);
        putPiece(piece);
      } else {
        // 3九へ配置
        boardManagement[8].splice(6, 1, piece);
        putPiece(piece);
      }
    } else if ("kin" === piece.front) {
      if (isEmpty(boardManagement[8][3])) {
        // 6九へ配置
        boardManagement[8].splice(3, 1, piece);
        putPiece(piece);
      } else {
        // 4九へ配置
        boardManagement[8].splice(5, 1, piece);
        putPiece(piece);
      }
    } else if ("kaku" === piece.front) {
      // 8八へ配置
      boardManagement[7].splice(1, 1, piece);
      putPiece(piece);
    } else if ("hisya" === piece.front) {
      // 2八へ配置
      boardManagement[7].splice(7, 1, piece);
      putPiece(piece);
    } else if ("ho" === piece.front) {
      if (isEmpty(boardManagement[6][0])) {
        boardManagement[6].splice(0);
        putPiece(piece);
      }
      // 9七～9七へ配置する
      boardManagement[6].push(piece);
      putPiece(piece);
    }
  }
  console.log(boardManagement);

  // 

};
// オブジェクトの空判定
const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

// 将棋盤の配置設定
const boardConfigJPN = [
  ["nine-one", "eight-one", "seven-one", "six-one", "five-one", "four-one", "three-one", "two-one", "one-one"],
  ["nine-two", "eight-two", "seven-two", "six-two", "five-two", "four-two", "three-two", "two-two", "one-two"],
  ["nine-three", "eight-three", "seven-three", "six-three", "five-three", "four-three", "three-three", "two-three", "one-three"],
  ["nine-four", "eight-four", "seven-four", "six-four", "five-four", "four-four", "three-four", "two-four", "one-four"],
  ["nine-five", "eight-five", "seven-five", "six-five", "five-five", "four-five", "three-five", "two-five", "one-five"],
  ["nine-six", "eight-six", "seven-six", "six-six", "five-six", "four-six", "three-six", "two-six", "one-six"],
  ["nine-seven", "eight-seven", "seven-seven", "six-seven", "five-seven", "four-seven", "three-seven", "two-seven", "one-seven"],
  ["nine-eight", "eight-eight", "seven-eight", "six-eight", "five-eight", "four-eight", "three-eight", "two-eight", "one-eight"],
  ["nine-nine", "eight-nine", "seven-nine", "six-nine", "five-nine", "four-nine", "three-nine", "two-nine", "one-nine"]
];

// 駒のポジションから盤面管理配列内の場所を返す
const getPiecePosition = (piece) =>{
  const position = piece.position;
  let result = [];
  for (let i = 0; i < boardConfigJPN.length; i++) {
    if(boardConfigJPN[i].some(item => item === position)){
      let j = boardConfigJPN[i].findIndex(item => item === position);
      result.push(i);
      result.push(j);
    }
  }
  return result;
}

// 盤面生成処理
const generateBoard = () => {
  console.log("盤面の生成を始めます");
  let board = document.getElementById("board");
  // 9*9のマスを用意する
  for (let i = 0; i < 9; i++) {
    let array = [
      new Object(),
      new Object(),
      new Object(),
      new Object(),
      new Object(),
      new Object(),
      new Object(),
      new Object(),
      new Object(),
    ];
    boardManagement.push(array);
  }
  let lines = ["-one", "-two", "-three", "-four", "-five", "-six", "-seven", "-eight", "-nine"]
  let columns = ["nine", "eight", "seven", "six", "five", "four", "three", "two", "one"];
  for(line of lines){
    for(column of columns){
      let positon = column + line;
      let element = document.createElement("div");
      element.id = positon;
      element.className = "cell"
      element.classList.add(line);
      element.innerHTML = "1";
      board.appendChild(element);
    }
  }
};

// 初期化処理
function init() {
  // 駒を生成する
  generatePieces();
  // 盤面を生成する
  generateBoard();
  // 駒を配置する
  setUpPieces();
  // 持ち時間を設定する

  // ターン設定をする
  turnManagement = "gyoku";
}

// 初期化処理実行
init();
