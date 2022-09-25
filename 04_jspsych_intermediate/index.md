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

これはいわゆるJSONと呼ばれる形式で、先程のテーブルを変換して得られます。例として、[Convert CSV to JSON](https://www.convertcsv.com/csv-to-json.htm) のような変換ツールを使ってみましょう。[サンプルファイル](./axb.csv) をダウンロードし、上記サイトにアップロードして CSV To JSON を押します。その内容を上のサンプルスクリプトのようにコピーして貼り付ければ完了です[[^bad]]。

[^bad]: 実際の運用でこのようなコピペは非難されます。まず、外部の変換アプリケーションに依存しているので挙動が保証できないのと、コピペするときにミスが割り込みうるからです。ただ、今回の変換はCSVからJSONという容易なものですし、コピペが必要な箇所もすくないので黙認しています。

## feedback

実際のトライアルに（特に練習のセッションでは）反応の正誤判定をはさみたい場合があります。その場合は、2つのステップで実現できます。まず正誤判定をするタイミングと正誤判定を表示するタイミングがあることを確認しましょう。前者は課題そのもので、その時点で正しいか否かを記録してあげます。これは以下のように `on_finish` というキーに関数を与えて上げれば良いです。この関数は`data.is_correct`に対し、`data.response`と`data.correct`が同じかを格納します。

```js
var axb_question = {
    type: 'html-keyboard-response',
    stimulus: '音声呈示は a -> x -> b の順でした。',
    choices: ['a', 'b'],
    prompt: "<p> 2つ目の音(x)は1つ目の音(a)と3つ目の音(b)のどちらに似ていますか。</p>",
    data: {
        task: 'axb', // production--perception-categorization
        type: jsPsych.timelineVariable('type'), // filler--target
        item_id: jsPsych.timelineVariable('item_id'),
        correct: jsPsych.timelineVariable('correct'),
    },
    on_finish: function (data) {
        data.is_correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct);
  },
};
```

次のステップは、この格納した`data.is_correct`を参照して表示させるだけです。前のステップである `axb_question` は `axb_trial` において `feedback` の前に位置しています。このとき、`feedback`からみた`axb_trial`の値`is_correct`は `jsPsych.data.get().last(1).values()[0].is_correct;` で参照できます。

```js
var feedback = {
  type: 'html-keyboard-response',
  stimulus: function () {
    let last_trial_correct = jsPsych.data.get().last(1).values()[0].is_correct;
    if (last_trial_correct) { return "<p>正解です。</p>"; }
    else { return "<p>不正解です。</p>"; }
  },
  choices: [' '],
  prompt: "次の問題に進む場合はスペースキーを押してください。",
};

var axb_trial = {
  timeline: [fixation, trial_a, trial_x, trial_b, axb_question, feedback],
  timeline_variables: timeline_variables
};
```

これでfeedbackを作成できました。

## ランダム化

これは簡単で、以下のようにするだけです。動作確認中はオフにすることをおすすめします。

```js
// Shuffle an array, no repeats
var timeline_variables = jsPsych.randomization.repeat(timeline_variables, 1);
```

さて、これで実用に足りる実験が作れるようになりました。ソースコードは[こちら](https://gist.github.com/kishiyamat/0e53281b3e335ada094f9ef0b3ae6928)になります。

<script src="https://gist.github.com/kishiyamat/0e53281b3e335ada094f9ef0b3ae6928.js"></script>

あとはリストを作成して、すべての音声をpreloadに加えて、パイロット実験をして、仮分析をして、本実験をして、結果を分析して、ゼミで発表して、修正して、学会で発表して、論文にまとめて、投稿するだけです！

次は産出実験の作り方を見ていきましょう。

---
