const ShogiPieces = {
  // 駒固有のID
  id: "",
  // 駒の表裏の状態
  state: "",
  // 駒の表
  front: "",
  // 表のイメージ
  frontImage: "",
  // 駒の裏
  back: "",
  // 裏のイメージ
  backImage: "",
  // 駒の持ち主
  owner: "",
  // 今いる地点
  position: "",
  // 駒の状態を判定し、該当する方の駒イメージを返す
  getImage: function() {
    return this.state === "front" ? this.frontImage : this.backImage;
  },
  // 駒の状態を判定し、該当する方の駒の表裏を返す
  getDisplay: function() {
    return this.state === "front" ? this.front : this.back;
  },
  //駒の所有者を変更する
  changeOwner: function() {
    if ("ou" === this.owner) {
      this.owner = "gyoku";
      console.log("駒の所有者が「王」から「玉」へ変わりました。");
    } else {
      this.owner = "ou";
      console.log("駒の所有者が「玉」から「王」へ変わりました。");
    }
  },
  // 駒を成る
  changeState: function() {
    this.state = "back";
  }
};
// 駒の設定情報
const INIT_STATE = "front";
const path = "./images/";
const OU = "ou";
const GYOKU = "gyoku";
const KIN = "kin";
const GIN = "gin";
const KEIMA = "keima";
const KYOSYA = "kyosya";
const HISYA = "hisya";
const KAKU = "kaku";
const HU = "hu";
const NARIGIN = "narigin";
const NARIKEI = "narikei";
const NARIKYO = "narikyo";
const TOKIN = "tokin";
const RYUO = "ryuo";
const RYUMA = "ryuma";
// 王、玉の設定
const kingConf = {
  front: OU,
  back: "",
  frontImage: path + "ou.png",
  backImage: "",
  counter: 1,
  positionConf: {
    "ou": ["five-one"],
    "gyoku": ["five-nine"]
  },
  deployablePosition: [1, 2, 3, 4, 5, 6, 7, 8]
};
// 金の設定
const kinConf = {
  front: KIN,
  back: "",
  frontImage: path + "kin.png",
  backImage: "",
  counter: 2,
  positionConf: {
    "ou": ["six-one", "four-one"],
    "gyoku": ["six-nine", "four-nine"]
  },
  deployablePosition: [1, 2, 3, 4, 5, 7]
};
// 銀の設定
const ginConf = {
  front: GIN,
  back: NARIGIN,
  frontImage: path + "gin.png",
  backImage: path + "narigin.png",
  counter: 2,
  positionConf: {
    "ou": ["seven-one", "three-one"],
    "gyoku": ["seven-nine", "three-nine"]
  },
  deployablePosition: [1, 2, 3, 6, 8]
};
// 飛車の設定
const hisyaConf = {
  front: HISYA,
  back: RYUO,
  frontImage: path + "hisya.png",
  backImage: path + "ryuo.png",
  counter: 1,
  positionConf: {
    "ou": ["seven-two"],
    "gyoku": ["three-eight"]
  },
  deployablePosition: [22, 44, 55, 77]
};
// 角の設定
const kakuConf = {
  front: KAKU,
  back: RYUMA,
  frontImage: path + "kaku.png",
  backImage: path + "ryuma.png",
  counter: 1,
  positionConf: {
    "ou": ["three-two"],
    "gyoku": ["seven-eight"]
  },
  deployablePosition: [11, 33, 66, 88]
};
// 桂馬の設定
const keimaConf = {
  front: KEIMA,
  back: NARIKEI,
  frontImage: path + "keima.png",
  backImage: path + "narikei.png",
  counter: 2,
  positionConf: {
    "ou": ["eight-one", "two-one"],
    "gyoku": ["eight-nine", "two-nine"]
  },
  deployablePosition: [9, 10]
};
// 香車の設定
const kyosyaConf = {
  front: KYOSYA,
  back: NARIKYO,
  frontImage: path + "kyosya.png",
  backImage: path + "narikyo.png",
  counter: 2,
  positionConf: {
    "ou": ["nine-one", "one-one"],
    "gyoku": ["nine-nine", "one-nine"]
  },
  deployablePosition: [22]
};
// 歩の設定
const huConf = {
  front: HU,
  back: TOKIN,
  frontImage: path + "hu.png",
  backImage: path + "tokin.png",
  counter: 9,
  positionConf: {
    "ou": ["nine-three", "eight-three", "seven-three", "six-three", "five-three", "four-three", "three-three", "two-three", "one-three"],
    "gyoku": ["nine-seven", "eight-seven", "seven-seven", "six-seven", "five-seven", "four-seven", "three-seven", "two-seven", "one-seven"]
  },
  deployablePosition: [2]
};
// 王、玉
const owners = ["ou", "gyoku"];

// 駒生成関数
const generater = (conf, owner) => {
  for (let i = 0; i < conf.counter; i++) {
    let piece = { ...ShogiPieces };
    piece.id = Math.floor(Math.random() * 1000);
    piece.state = INIT_STATE;
    piece.front = conf.front;
    piece.back = conf.back;
    piece.owner = owner;
    piece.frontImage = conf.frontImage;
    // "玉"の場合のみ、強制的にイメージを変更する
    if (GYOKU === owner && OU === conf.front) {
      piece.frontImage = path + "gyoku.png";
    }
    piece.backImage = conf.backImage;
    const map = new Map(Object.entries(conf.positionConf));
    piece.position = map.get(owner)[i];
    divideOwner(owner, piece);
  }
};

// 駒振り分け関数
const divideOwner = (owner, piece) => {
  if (OU === owner) {
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
    generater(huConf, owner);
  }
};

// 盤面に駒を置く
const putPiece = (piece) => {
  const frontPosition = piece.position;
  let displayPosition = document.getElementById(frontPosition);
  let image = document.createElement("img");
  image.src = piece.getImage();
  image.alt = piece.getDisplay();
  if (OU === piece.owner) {
    image.style.transform = "rotate(0.5turn)"
  }
  displayPosition.appendChild(image);
}
// 盤面管理配列の駒を再配置する
const putBackPiece = (piece) => {
  const [i, j] = getPieceBackPosition(piece);
  boardManagement[i].splice(j, 1, piece);
}
// 移動不可な場所を配列から削除する
const excludingDeleteIndexs = (deleteIndexs, target) => {
  for (let i = 0; i < deleteIndexs.length; i++) {
    if (target.includes(deleteIndexs[i])) {
      const index = target.indexOf(deleteIndexs[i]);
      target.splice(index, 1);
    }
  }
}

// 駒の配置可能な場所を返す
const getDeployablePosition = (piece) => {
  // 1:左上 2:正面 3:右上
  // 4:左         5:右
  // 6:左後 7:真後 8:右後
  // (桂馬)9:左前 10:右前
  // 
  // 香車、飛車、角の場合、進めるマスの数だけ、桁数を増やす
  // 香車で2マス進める場合、[22]
  // 角で3マス進める場合、[111]や[888]
  let result = [];
  // 駒の今のバックポジションを取得する
  const [i, j] = getPieceBackPosition(piece);
  // 駒の動ける範囲を取得する
  result = getDeployableConfig(piece);
  // 盤面の外に移動可能先がある場合は、対象外のため削除する
  // 最前面にいる場合は[1,2,3,9,10]を除く（桂馬の場合、前から2列目）
  if ((OU === piece.owner && 8 === i)||(GYOKU === piece.owner && 0 === i)) {
    let deleteIndexs = [1, 2, 3, 9, 10];
    excludingDeleteIndexs(deleteIndexs, result);
  }
  // 左の列にいる場合は[1,4,6,9]を除く
  if ((OU === piece.owner && 8 === j)||(GYOKU === piece.owner && 0 === j)) {
    let deleteIndexs = [1, 4, 6, 9];
    excludingDeleteIndexs(deleteIndexs, result);
  }
  // 右の列にいる場合は[3,5,8,10]を除く
  if ((OU === piece.owner && 0 === j)||(GYOKU === piece.owner && 8 === j)) {
    let deleteIndexs = [3, 5, 8, 10];
    excludingDeleteIndexs(deleteIndexs, result);
  }
  // 最背面の列にいる場合は[6,7,8]を除く
  if ((OU === piece.owner && 0 === i)||(GYOKU === piece.owner && 8 === i)) {
    let deleteIndexs = [6, 7, 8];
    excludingDeleteIndexs(deleteIndexs, result);
  }
  // 移動可能先に自分の駒がある場合は、移動先配列から削除する
  let existPieces = [];
  for (num of result) {
    // 移動不可の場合に、trueを返す
    // 第一引数は移動先の駒情報、第二引数は手番
    const exist = (piece, owner) => {
      // console.log("exist関数", piece, owner);
      return !isEmpty(piece) || owner === piece.owner;
    }
    switch (num) {
      // 左上
      case 1:
        if (exist(boardManagement[i-1][j-1], turnManagement)) {
          existPieces.push(1);
        }
        break;
      // 正面
      case 2:
        if (exist(boardManagement[i-1][j], turnManagement)) {
          existPieces.push(2);
        }
        break;
      // 右上
      case 3:
        if (exist(boardManagement[i-1][j+1], turnManagement)) {
          existPieces.push(3);
        }
        break;
      // 左
      case 4:
        if (exist(boardManagement[i][j-1], turnManagement)) {
          existPieces.push(4);
        }
        break;
      // 右
      case 5:
        if (exist(boardManagement[i][j+1], turnManagement)) {
          existPieces.push(5);
        }
        break;
      // 左下
      case 6:
        if (exist(boardManagement[i+1][j-1], turnManagement)) {
          existPieces.push(6);
        }
        break;
      // 真後
      case 7:
        if (exist(boardManagement[i+1][j], turnManagement)) {
          existPieces.push(7);
        }
        break;
      // 右後
      case 8:
        if (exist(boardManagement[i+1][j+1], turnManagement)) {
          existPieces.push(8);
        }
        break;
      // （桂馬）左上
      case 9:
        if (exist(boardManagement[i-2][j-1], turnManagement)) {
          existPieces.push(9);
        } 
        break;
      // （桂馬）右上
      case 10:
        if (exist(boardManagement[i-2][j+1], turnManagement)) {
          existPieces.push(10);
        } 
        break;
      //（飛車・香車）正面直線
      case 22:
        break;
      //（飛車）左直線
      case 44:
        break;
      //（飛車）右直線
      case 55:
        break;
      //（飛車）後直線
      case 77:
        break;
      //（角）左上斜め直線
      case 11:
        break;
      //（角）右上斜め直線
      case 33:
        break;
      //（角）左下斜め直線
      case 66:
        break;
      //（角）右下斜め直線
      case 88:
        break;
    }
  }
  excludingDeleteIndexs(existPieces, result);
  return result;
}

// 駒の動ける範囲を返す
const getDeployableConfig = (piece) => {
  let result = [];
  const display = piece.getDisplay();
  if (OU === display) {
    // 王、玉の動ける範囲を設定する
    result = kingConf.deployablePosition;
  } else if (GIN === display) {
    // 銀の動ける範囲を設定する
    result = ginConf.deployablePosition;
  } else if (KEIMA === display) {
    // 桂馬の動ける範囲を設定する
    result = keimaConf.deployablePosition;
  } else if (KYOSYA === display) {
    // 香車の動ける範囲を設定する
    result = kyosyaConf.deployablePosition;
  } else if (HISYA === display) {
    // 飛車の動ける範囲を設定する
    result = hisyaConf.deployablePosition;
  } else if (KAKU === display) {
    // 角の動ける範囲を設定する
    result = kakuConf.deployablePosition;
  } else if (HU === display) {
    // 歩の動ける範囲を設定する
    result = huConf.deployablePosition;
  } else if (RYUO === display) {
    // 竜王の動ける範囲を設定する
    result = kinConf.deployablePosition;
    result.push(hisyaConf.deployablePosition);
  } else if (RYUMA === display) {
    // 竜馬の動ける範囲を設定する
    result = kinConf.deployablePosition;
    result.push(kakuConf.deployablePosition);
  } else {
    // 金(成銀、成桂、成香、と金)の動ける範囲を設定する
    result = kinConf.deployablePosition;
  }
  return result;
}

// 駒を初期位置へ配置する
const setUpPieces = () => {
  // 王の駒を並べる
  for (piece of ouOwnerPieces) {
    if (OU === piece.front) {
      // 5一へ配置
      boardManagement[0].splice(4, 1, piece);
      putPiece(piece);
    } else if (KYOSYA === piece.front) {
      if (isEmpty(boardManagement[0][0])) {
        // 9一へ配置
        boardManagement[0].splice(0, 1, piece);
        putPiece(piece);
      } else {
        // 1一へ配置
        boardManagement[0].splice(8, 1, piece);
        putPiece(piece);
      }
    } else if (KEIMA === piece.front) {
      if (isEmpty(boardManagement[0][1])) {
        // 8一へ配置
        boardManagement[0].splice(1, 1, piece);
        putPiece(piece);
      } else {
        // 2一へ配置
        boardManagement[0].splice(7, 1, piece);
        putPiece(piece);
      }
    } else if (GIN === piece.front) {
      if (isEmpty(boardManagement[0][2])) {
        // 7一へ配置
        boardManagement[0].splice(2, 1, piece);
        putPiece(piece);
      } else {
        // 3一へ配置
        boardManagement[0].splice(6, 1, piece);
        putPiece(piece);
      }
    } else if (KIN === piece.front) {
      if (isEmpty(boardManagement[0][3])) {
        // 6一へ配置
        boardManagement[0].splice(3, 1, piece);
        putPiece(piece);
      } else {
        // 4一へ配置
        boardManagement[0].splice(5, 1, piece);
        putPiece(piece);
      }
    } else if (KAKU === piece.front) {
      // 8二へ配置
      boardManagement[1].splice(1, 1, piece);
      putPiece(piece);
    } else if (HISYA === piece.front) {
      // 2二へ配置
      boardManagement[1].splice(7, 1, piece);
      putPiece(piece);
    } else if (HU === piece.front) {
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
    if (OU === piece.front) {
      // 5九へ配置
      boardManagement[8].splice(4, 1, piece);
      putPiece(piece);
    } else if (KYOSYA === piece.front) {
      if (isEmpty(boardManagement[8][0])) {
        // 9九へ配置
        boardManagement[8].splice(0, 1, piece);
        putPiece(piece);
      } else {
        // 1九へ配置
        boardManagement[8].splice(8, 1, piece);
        putPiece(piece);
      }
    } else if (KEIMA === piece.front) {
      if (isEmpty(boardManagement[8][1])) {
        // 8九へ配置
        boardManagement[8].splice(1, 1, piece);
        putPiece(piece);
      } else {
        // 2九へ配置
        boardManagement[8].splice(7, 1, piece);
        putPiece(piece);
      }
    } else if (GIN === piece.front) {
      if (isEmpty(boardManagement[8][2])) {
        // 7九へ配置
        boardManagement[8].splice(2, 1, piece);
        putPiece(piece);
      } else {
        // 3九へ配置
        boardManagement[8].splice(6, 1, piece);
        putPiece(piece);
      }
    } else if (KIN === piece.front) {
      if (isEmpty(boardManagement[8][3])) {
        // 6九へ配置
        boardManagement[8].splice(3, 1, piece);
        putPiece(piece);
      } else {
        // 4九へ配置
        boardManagement[8].splice(5, 1, piece);
        putPiece(piece);
      }
    } else if (KAKU === piece.front) {
      // 8八へ配置
      boardManagement[7].splice(1, 1, piece);
      putPiece(piece);
    } else if (HISYA === piece.front) {
      // 2八へ配置
      boardManagement[7].splice(7, 1, piece);
      putPiece(piece);
    } else if (HU === piece.front) {
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
const getPieceBackPosition = (piece) =>{
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
      //element.innerHTML = "1";
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
  turnManagement = GYOKU;
}

// 初期化処理実行
init();
