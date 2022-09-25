## jsPsych の応用的な機能を確認

### timeline_variables

前回のページで作成した実験はいかが問題でした。特に１つ目の問題は致命的です。

```js
// FIXME: 以下が改善点になる。
// timelineを使っていないのでtrial_a みたいなのをたくさん書かないといけない。
// onfinish がないから feedback ができない。
// randomize もされていない。
```

なぜなら、AXBやAX課題が一つのトライアルで終わることはなく、以下を作成してtimelineにたくさんコピペしなければならないからです。

```js
var trial_a = {
    type: 'audio-keyboard-response',
    stimulus: "espo-1.wav",
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    post_trial_gap: 200,
};

var trial_x = {
    type: 'audio-keyboard-response',
    stimulus: "esupo-2.wav",
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    post_trial_gap: 200,
};

var trial_b = {
    type: 'audio-keyboard-response',
    stimulus: "esupo-3.wav",
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
};

// trial 1
timeline.push(fixation); // 'html-keyboard-response'
timeline.push(trial_a); // 'audio-keyboard-response'
timeline.push(trial_x); // 'audio-keyboard-response'
timeline.push(trial_b); // 'audio-keyboard-response'
timeline.push(axb_question); // 'html-keyboard-response'
// これだとtrial 2以降もコピペが必要...
```

<!--https://www.tablesgenerator.com/markdown_tables-->
そうではなく、以下のようなテーブルがあると想定して、各トライアルは行方向に（つまり下に）進み、`trial_a`や`trial_b`などのstimulusキーの値をテーブル内のaやxの値で置き換えられたらどうでしょうか。その場合、コピペは不要になります。また、そのときに `item_id` や `type` の情報などの「分析時に必要な情報」も持たせられれば後でデータのマージが不要になります。

| a           | x           | b           | type   | item_id | correct |
|-------------|-------------|-------------|--------|---------|---------|
| espo-1.wav  | esupo-2.wav | esupo-3.wav | target | 1       | b       |
| esupo-3.wav | esupo-2.wav | espo-1.wav  | filler | 2       | a       |

これを可能にしてくれるのが`timeline_variables`を持ったオブジェクトです。前回は `timeline` という変数を作り、そこにpushしていました。そうではなく、上のテーブルを行方向に回す前提で列名を`jsPsych.timelineVariable('a')` のように参照して `trial_a` などを作ってしまいます。

```js
var trial_a = {
    type: 'audio-keyboard-response',
    stimulus: jsPsych.timelineVariable('a'), // ここで参照
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    post_trial_gap: 200,
};

var trial_x = {
    type: 'audio-keyboard-response',
    stimulus: jsPsych.timelineVariable('x'), // ここで参照
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    post_trial_gap: 200,
};

var trial_b = {
    type: 'audio-keyboard-response',
    stimulus: jsPsych.timelineVariable('b'), // ここで参照
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
};
```

そして、`jsPsych.timelineVariable('a')`などで参照するキー（ここでは`'a'`）を持つ辞書を一つの行にします。そうした行を以下のようにトライアル分だけ持つリストを作成します。その結果が以下です。

```js
var timeline_variables = [
 {
   "a": "espo-1.wav",
   "x": "esupo-2.wav",
   "b": "esupo-3.wav",
   "type": "target",
   "item_id": 1,
   "correct": "b"
 },
 {
   "a": "esupo-3.wav",
   "x": "esupo-2.wav",
   "b": "espo-1.wav",
   "type": "filler",
   "item_id": 2,
   "correct": "a"
 }
]

var axb_trial = {
  timeline: [fixation, trial_a, trial_x, trial_b, axb_question, feedback],
  timeline_variables: timeline_variables
};
```

これはいわゆるJSONと呼ばれる形式で、先程のテーブルを変換して得られます。例として、[Convert CSV to JSON](https://www.convertcsv.com/csv-to-json.htm) のような変換ツールを使ってみましょう。[サンプルファイル](./axb.csv) をダウンロードし、上記サイトにアップロードして CSV To JSON を押します。その内容をコピーして貼り付ければ完了です。

```
FIXME: 
// onfinish がないから feedback ができない。
// randomize もされていない。

timeline_variables: リストを回す際に必須, randomize など
on_finish （反応の正誤の記録など、リダイレクト）
```

3.1. Preload
3.2. リスト作成&ランダマイズ
3.3. リダイレクト
補足. function と デバッグ


function

---
