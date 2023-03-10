'use strict';
const userNameInput = document.getElementById('user-name'); //テキストエリアに文字列を入力するところ
const assessmentButton = document.getElementById('assessment'); //診断ボタン
const resultDivided = document.getElementById('result-area'); //結果のところ
const tweetDivided = document.getElementById('tweet-area'); //ツイートするボタン

assessmentButton.onclick = () => {
  const userName = userNameInput.value; //valueプロパティ:テキストエリアに入力された文字列を受け取ることができる
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return; //戻り価なしにそこで処理を終了する（名前の文字列の長さが0だった場合、処理を終了する）
  }

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

  // 診断結果表示エリアの作成
  resultDivided.innerText = ''; //テキストエリアが空の時は子要素を全部消す？？
  // const header = document.createElement('h3'); //createElement「要素を作成する」
  // header.innerText = '診断結果'; //innerText「内側のテキスト」
  // resultDivided.appendChild(header);

  // const paragraph = document.createElement('p');
  // const result = assessment(userName);
  // paragraph.innerText = result;
  // resultDivided.appendChild(paragraph);
  
  //headerDivided の作成
  const headerDivided = document.createElement('div');
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '診断結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  //resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px;')

  // headerDivided と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

  // ツイートエリアの作成
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') + 
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  
  tweetDivided.appendChild(anchor);

  // widgets.jsスクリプトを設定し実行する（twitterボタンのような見た目になる、診断結果もツイートに組み込まれる）
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

};



const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName); //第1引数の文字列を全て第二引数の文字列に変換する
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
