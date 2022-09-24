# jsPsych の基本的な機能を確認

## 補足: JavaScript の基本

解説の前にJavaScriptの基本的な文法をここで補足します。解説に必要な文法にはコメント、変数 (`var`) と データ型（リスト、文字列、数字、辞書などの違い）、そして関数があります。いずれも、RやPythonを勉強したことのある方には馴染み深いものだと思います。ほぼ https://jsprimer.net/basic/ から抜粋ですので、より細かく知りたい方はそちらをご参照ください。また https://www.w3schools.com/js/ も役立ちます。

コメントとはプログラムとして実行されない記述です。例えば、以下のようにスラッシュを２つ置くことでその後ろをコメントにできます。見ただけでは分かりづらいコードを書いてしまったときや、説明が必要なときに使います。VSCodeやRStudioを含め、大抵のエディターではショートカットが用意されています。

```js
// FIXME や TODO などを書いておく
```

変数とは文字列や数値に与えたラベルです。例えば、以下のようにラベル名（`list_audio_preload`）をvarキーワードと `=` で鋏み、その後ろに格納したいものを記述します。こうすると、同じものを使いまわしたいときにコピペしないですみます。なお、後ろで与えているものは 文字列のリスト です。次に、こうした「文字列」や「リスト」といったデータ型の説明をします。

```js
var list_audio_preload = ['espo-1.wav','esupo-2.wav','esupo-3.wav']
```

データ型には種類が多くありますが、今回のチュートリアルで理解しておけばよい種類は 文字列、数値、そしてリストや辞書です。数字は四則演算ができ、上記のように `'` や `"` でくくる文字列は結合などの操作ができます。また、リストは文字列や数値を `[ ]` でまとめられます。辞書は複数の `key: value` を `{}` でまとめます。これらのデータ型は次の「関数」で指定されているケースが多いです。

```js
var arr = []; // List
var dict = { 'a': 'aa', 'b': 'bb' }; // Dict
```

関数とは手続きをひとまとめにしたものです。例えば、`jsPsych.data.displayData()` という関数は画面上にデータを表示する機能です。関数はカッコを用いて実行でき、この例で言えば「表示する一連の手続き」を実行できます。厳密には「メソッド」と呼ばれるものですが、その区別は今回のチュートリアルにおいて不要です。

```js
function myFunction(p1, p2) {
  return p1 * p2;   // The function returns the product of p1 and p2
}
```

以上のJavaScriptの基本を抑えた上で、jsPsychを用いたスクリプトの説明を進めていきます。

## jsPsych の基本的な機能

ここから書いてあることは基本的に公式ドキュメント（ https://www.jspsych.org/ ）に書いてある通りです。ただ読み慣れていないと辛いので、補足として記述していきます。それでは[前の章](../02_perception_minimal)でコピペしたミニマル実験のスクリプトの中身を見ていきましょう。

<script src="https://gist.github.com/kishiyamat/cc4a18f8ceb376abb4afdcf9366dc595.js"></script>

以上は約80行のコードでして、以下の順番で説明していきます。

1. `timeline` の定義[63--71行目](https://gist.github.com/kishiyamat/cc4a18f8ceb376abb4afdcf9366dc595#file-axb_v01-js-L63-L71)
1. `preload` の定義と役目
1. `response`の類の定義

### timeline

まずは `timeline` を示す[63--71行目](https://gist.github.com/kishiyamat/cc4a18f8ceb376abb4afdcf9366dc595#file-axb_v01-js-L63-L71) の`var timeline`の定義から確認します。ここでは`timeline`という空の配列`[]`を作り、`preload`や`axb_instructions_practice`、`fixation`を`timeline` に追加(`push`)していっています。そして AXB課題のそれぞれである `trial_a`、`trial_x`、そして `trial_b`を追加し、最後に被験者の反応を記録する`axb_question`を追加して完了です。

```js
// TIMELINE
var timeline = [];
timeline.push(preload);
timeline.push(axb_instructions_practice);
timeline.push(fixation);
timeline.push(trial_a);
timeline.push(trial_x);
timeline.push(trial_b);
timeline.push(axb_question);
```

この `timeline` を関数 `jsPsych.init` の引数に渡したいのですが(l.75)、辞書としてしか渡せません。この関数`jsPsych.init`は https://www.jspsych.org/6.3/overview/timeline/ に書いてある通り、`timeline` と `on_finish` というキーワードを持った辞書を必要とします。ここでの `on_finish` はトライアル全てが終わったあとの挙動を定義しており、 `jsPsych.data.displayData()` で取得したデータを表示します（動作確認のときに便利です）。

```js
jsPsych.init({
   timeline: timeline,
   on_finish: function(){
      jsPsych.data.displayData();
   }
});
```

以上をまとめると、実験は <u>(a)`timeline` を定義する</u>ことと、<u>それを辞書にまとめて `jsPsych.init` に与える</u>だけで作成できます。今回はAXBですので  `trial_a` → `trial_x` → `trial_b` の順序ですが、AXにしたかったりABXにしたかったりする際は順序を置き換えればよいだけです。さて、それでは timeline の中身を詳しく見ていきましょう。

### preload

コピペしたコードの `timeline` までの部分で定義した変数は(定義は`var` を使っている部分です)、`reseponse`と`preload`に分けられます。どちらも`jsPsych`に使うオブジェクトで、 `type` というキーワードを必要とする辞書です。例として、`preload`の定義を見てみましょう。

```js
var list_audio_preload = ['espo-1.wav','esupo-2.wav','esupo-3.wav']
var preload = {
 type: 'preload',
 audio: list_audio_preload,
}
```

したがって、`preload` は `'preload'` という値を `type` をキーに持った辞書になっています。そして、audio というキーワードには事前にダウンロードするwavのファイル名をリストで持っています。

この preload が必要となる理由は、preloadなしだと被験者のPCにダウンロードするタイミングが刺激の呈示前になってしまうので、若干のラグが発生しうるからです。その場合、AXB実験のような呈示する時間がが大切なケースでは問題になるので、かならず preload は組み込むようにしましょう。

### response

次は `response` の説明です。サンプルコードで使ったのは `html-keyboard-response` と `audio-keyboard-response` の2種類です。前者は注視点「＋」の呈示と被験者からのレスポンスの取得が役割で、後者は音声呈示とレスポンスの取得が役割です。こうした `response` の種類は https://www.jspsych.org/6.3/plugins/list-of-plugins/ にもあり、それぞれで必要なキーワードが決まっています。そこでまずは `html-keyboard-response` を例に考えてみましょう

　この `html-keyboard-response` では以下に示すように、`type`, `stimulus`, `choices`, `trial_duration` の4つのキーワードを指定してあげる必要があります。HTMLを表示してレスポンスを受ける `html-keyboard-response`  を作成するためには、`type` は `'html-keyboard-response'` という文字列を与えます。表示したい肝心の HTMLも、文字列で与えています。fixation は反応を必要としないので、`jsPsych.NO_KEYS` としており、`trial_duration` は定番の（？）1000ms です[[^settings]]。

[^settings]: ここらへんの設定は論文のMethodセクションにたいてい書いてある。

```js
var fixation = {
 type: 'html-keyboard-response',
 stimulus: '<div style="font-size:60px;">+</div>',
 choices: jsPsych.NO_KEYS,
 trial_duration: 1000,
}
```

これはfixationなので反応を受け付けないという特殊な `html-keyboard-response` ですが、もちろん特定のキーのみ受け付けて記録できます。公式ドキュメント（ https://www.jspsych.org/7.2/plugins/html-keyboard-response/ ）を参照すると、より細かい指定がわかります。ここでのレスポンスは記録されます。

さて、この `response` は他にも色々と使えます。実際、timelineにpushした以下の全ては`preload`か`response`なのです。そして音声呈示が必要か、必要なく指示のみでよいかなどで `response` の種類が分かれます。

```js
timeline.push(preload); // preload
timeline.push(axb_instructions_practice); // 'html-keyboard-response'
timeline.push(fixation); // 'html-keyboard-response'
timeline.push(trial_a); // 'audio-keyboard-response'
timeline.push(trial_x); // 'audio-keyboard-response'
timeline.push(trial_b); // 'audio-keyboard-response'
timeline.push(axb_question); // 'html-keyboard-response'
```

さて、これでミニマルな実験の作成な話は終わりました。ただ前の章で話したとおり、このミニマルな実験にはいろいろな問題があります。例えば、トライアルが増えたらその分のコードを増やさないといけません。また、実験によっては回答があっているか間違っているかのフィードバックもしたいのですが、そのような仕組みも入っていません。

```js
// FIXME: 以下が改善点になる。
// timelineを使っていないのでtrial_a みたいなのをたくさん書かないといけない。
// onfinish がないから feedback ができない。
// randomize もされていない。
```

次に、これらの細かい問題を [04_jspsych_intermediate](../04_jspsych_intermediate)で解決します。

