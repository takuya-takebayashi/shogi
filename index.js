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
  avilablePosition: (nowPosition) => {
    const first = nowPosition[0];
    const second = nowPosition[1];
    let result = [];
    // 左端にいる場合
    if (0 === second) {
      // 正面
      if (first !== 0) {
        if (isEmpty(boardManagement[first - 1][0])) {
          result.push(2);
        }
      }
    }
  },
};
// 金の設定
const kinConf = {
  front: "kin",
  back: "",
  frontImage: "",
  backImage: "",
  counter: 2,
};
// 銀の設定
const ginConf = {
  front: "gin",
  back: "narigin",
  frontImage: "",
  backImage: "",
  counter: 2,
};
// 飛車の設定
const hisyaConf = {
  front: "hisya",
  back: "ryuo",
  frontImage: "",
  backImage: "",
  counter: 1,
};
// 角の設定
const kakuConf = {
  front: "kaku",
  back: "ryuma",
  frontImage: "",
  backImage: "",
  counter: 1,
};
// 桂馬の設定
const keimaConf = {
  front: "keima",
  back: "narikei",
  frontImage: "",
  backImage: "",
  counter: 2,
};
// 香車の設定
const kyosyaConf = {
  front: "kyosya",
  back: "narikyo",
  frontImage: "",
  backImage: "",
  counter: 2,
};
// 歩の設定
const hoConf = {
  front: "ho",
  back: "tokin",
  frontImage: "",
  backImage: "",
  counter: 9,
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
    // console.log(piece);
    divideOwner(owner, piece);
  }
};
// 駒振り分け関数
const divideOwner = (owner, piece) => {
  if ("ou" === owner) {
    ouOwnerPieces.push(piece);
  } else {
    gyokuOwnerPieces.push(piece);
  }
  // console.log(ouOwnerPieces);
  // console.log(gyokuOwnerPieces);
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

// 駒を初期位置へ配置する
const setUpPieces = () => {
  // 王の駒を並べる
  for (piece of ouOwnerPieces) {
    if ("ou" === piece.front) {
      // 5一へ配置
      boardManagement[0].splice(4, 1, piece);
    } else if ("kyosya" === piece.front) {
      if (isEmpty(boardManagement[0][0])) {
        // 9一へ配置
        boardManagement[0].splice(0, 1, piece);
      } else {
        // 1一へ配置
        boardManagement[0].splice(8, 1, piece);
      }
    } else if ("keima" === piece.front) {
      if (isEmpty(boardManagement[0][1])) {
        // 8一へ配置
        boardManagement[0].splice(1, 1, piece);
      } else {
        // 2一へ配置
        boardManagement[0].splice(7, 1, piece);
      }
    } else if ("gin" === piece.front) {
      if (isEmpty(boardManagement[0][2])) {
        // 7一へ配置
        boardManagement[0].splice(2, 1, piece);
      } else {
        // 3一へ配置
        boardManagement[0].splice(6, 1, piece);
      }
    } else if ("kin" === piece.front) {
      if (isEmpty(boardManagement[0][3])) {
        // 6一へ配置
        boardManagement[0].splice(3, 1, piece);
      } else {
        // 4一へ配置
        boardManagement[0].splice(5, 1, piece);
      }
    } else if ("kaku" === piece.front) {
      // 8二へ配置
      boardManagement[1].splice(1, 1, piece);
    } else if ("hisya" === piece.front) {
      // 2二へ配置
      boardManagement[1].splice(7, 1, piece);
    } else if ("ho" === piece.front) {
      if (isEmpty(boardManagement[2][0])) {
        boardManagement[2].splice(0);
      }
      // 9三～9三へ配置する
      boardManagement[2].push(piece);
    }
  }
  // 玉の駒を並べる
  for (piece of gyokuOwnerPieces) {
    if ("ou" === piece.front) {
      // 5九へ配置
      boardManagement[8].splice(4, 1, piece);
    } else if ("kyosya" === piece.front) {
      if (isEmpty(boardManagement[8][0])) {
        // 9九へ配置
        boardManagement[8].splice(0, 1, piece);
      } else {
        // 1九へ配置
        boardManagement[8].splice(8, 1, piece);
      }
    } else if ("keima" === piece.front) {
      if (isEmpty(boardManagement[8][1])) {
        // 8九へ配置
        boardManagement[8].splice(1, 1, piece);
      } else {
        // 2九へ配置
        boardManagement[8].splice(7, 1, piece);
      }
    } else if ("gin" === piece.front) {
      if (isEmpty(boardManagement[8][2])) {
        // 7九へ配置
        boardManagement[8].splice(2, 1, piece);
      } else {
        // 3九へ配置
        boardManagement[8].splice(6, 1, piece);
      }
    } else if ("kin" === piece.front) {
      if (isEmpty(boardManagement[8][3])) {
        // 6九へ配置
        boardManagement[8].splice(3, 1, piece);
      } else {
        // 4九へ配置
        boardManagement[8].splice(5, 1, piece);
      }
    } else if ("kaku" === piece.front) {
      // 8八へ配置
      boardManagement[7].splice(1, 1, piece);
    } else if ("hisya" === piece.front) {
      // 2八へ配置
      boardManagement[7].splice(7, 1, piece);
    } else if ("ho" === piece.front) {
      if (isEmpty(boardManagement[6][0])) {
        boardManagement[6].splice(0);
      }
      // 9七～9七へ配置する
      boardManagement[6].push(piece);
    }
  }
};
// オブジェクトの空判定
const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};
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
