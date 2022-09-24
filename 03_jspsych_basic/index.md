# jsPsych の基本的な機能を確認

## 補足: JavaScript の基本

解説の前にJavaScriptの基本的な文法をここで補足します。解説に必要な文法にはコメント、変数 (`var`) と データ型（リスト、文字列、数字、辞書などの違い）、そして関数があります。いずれも、RやPythonを勉強したことのある方には馴染み深いものだと思います。ほぼ https://jsprimer.net/basic/ から抜粋ですので、より細かく知りたい方はそちらをご参照ください。

コメントとはプログラムとして実行されない記述です。例えば、以下のようにスラッシュを２つ置くことでその後ろをコメントにできます。見ただけでは分かりづらいコードを書いてしまったときや、説明が必要なときに使います。VSCodeやRStudioを含め、大抵のエディターではショートカットが用意されています。

```js
// FIXME や TODO などを書いておく
```

変数とは文字列や数値に与えたラベルです。例えば、以下のようにラベル名（`list_audio_preload`）をvarキーワードと `=` で鋏み、その後ろに格納したいものを記述します。こうすると、同じものを使いまわしたいときにコピペしないですみます。なお、後ろで与えているものは 文字列のリスト です。次に、こうした「文字列」や「リスト」といったデータ型の説明をします。

```js
var list_audio_preload = ['espo-1.wav','esupo-2.wav','esupo-3.wav']
```

データ型には種類が多くありますが、今回のチュートリアルで理解しておけばよい種類は 文字列、数値、そしてリストや辞書です。数字は四則演算ができ、上記のように `'` や `"` でくくる文字列は結合などの操作ができます。また、リストは文字列や数値を `[ ]` でまとめられます。辞書は複数の `key: value` を `{}` でまとめます。これらのデータ型は次の「関数」で指定されているケースが多いです。

関数とは手続きをひとまとめにしたものです。例えば、`jsPsych.data.displayData()` という関数は画面上にデータを表示する機能です。関数はカッコを用いて実行でき、この例で言えば「表示する一連の手続き」を実行できます。厳密には「メソッド」と呼ばれるものですが、その区別は今回のチュートリアルにおいて不要です。

以上の基本を抑えた上で、スクリプトの説明を進めていきます。

## jsPsych の基本的な機能

ここから書いてあることは基本的に公式ドキュメント（ https://www.jspsych.org/ ）に書いてあるとおりです。ただ読み慣れていないと辛いので、補足として記述していきます。それでは[前の章](../02_perception_minimal)でコピペしたミニマル実験のスクリプトの中身を見ていきましょう。約80行のコードですが、以下の順番で説明していきます。

1. `timeline` を示す[64--72行目](https://gist.github.com/kishiyamat/cc4a18f8ceb376abb4afdcf9366dc595#file-axb_v01-js-L64-L72)

<script src="https://gist.github.com/kishiyamat/cc4a18f8ceb376abb4afdcf9366dc595.js"></script>
### timeline

まずは `timeline` を示す[64--72行目](https://gist.github.com/kishiyamat/cc4a18f8ceb376abb4afdcf9366dc595#file-axb_v01-js-L64-L72) の`var timeline`の定義から確認します。ここでは`timeline`という空の配列`[]`を作り、`preload`や`axb_instructions_practice`、`fixation`を`timeline` に追加(`push`)していっています。そして AXB課題のそれぞれである `trial_a`、`trial_x`、そして `trial_b`を追加し、最後に被験者の反応を記録する`axb_question`を追加して完了です。

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






この timeline を jsPsych.init 関数に渡したいのですが、辞書としてしか渡せません。詳しくは https://www.jspsych.org/6.3/overview/timeline/ に書いてありますが、timeline と on_finish というキーワードを持った辞書を必要とします。ここでの on_finish はトライアル全てが終わったあとの挙動を定義しており、 jsPsych.data.displayData() で取得したデータを表示します（動作確認のときに便利です）。

jsPsych.init({




   timeline: timeline,


   on_finish: function(){


      jsPsych.data.displayData();


   }


});


以上をまとめると、実験は timeline を定義することと、それを辞書にまとめて jsPsych.init に与えてあげるだけで作成できます。今回はAXBですので  trial_a → trial_x → trial_b の順序ですが、AXにしたかったりABXにしたかったりする際は順序を置き換えればよいだけです。さて、それでは timeline の中身を詳しく見ていきましょう。

2.2. preload

　コピペしたコードの timeline までの部分で var を使って定義した変数は、preload とreseponse に大きく分けられます。どちらもjsPsychに使うオブジェクトで、 type というキーワードを必要とする辞書です。したがって、最初の preload は preload というタイプを持った辞書になっています。そして、audio というキーワードには事前にダウンロードする wav のファイル名をリストで持っています。


// Preload をしないから、最初のトライアルがもっさりする。




var list_audio_preload = ['espo-1.wav','esupo-2.wav','esupo-3.wav']


var preload = {


 type: 'preload',


 audio: list_audio_preload,


}


　この preload がない場合、被験者のPCにダウンロードするタイミングが刺激の呈示前になってしまうので、若干のラグが発生します。その場合、AXB実験のような呈示する時間がが大切なケースでは問題になるので、かならず preload は組み込むようにしましょう。
2.3. response

　次は response の説明です。サンプルコードで使ったのは html-keyboard-response と audio-keyboard-response の2種類です。前者は注視点「＋」の呈示と被験者からのレスポンスの取得が役割で、後者は音声呈示とレスポンスの取得が役割です。こうした response の種類は https://www.jspsych.org/6.3/plugins/list-of-plugins/ にもあり、それぞれで必要なキーワードが決まっています。そこでまずは html-keyboard-response を例に考えてみましょう

　この html-keyboard-response では以下に示すように、type, stimulus, choices, trial_duration の4つのキーワードを指定してあげる必要があります。HTMLを表示してレスポンスを受ける html-keyboard-response  を作成するためには、type は 'html-keyboard-response' という文字列を与えます。表示したい肝心の HTMLも、文字列で与えています。fixation は反応を必要としないので、jsPsych.NO_KEYS としており、trial_duration は 1000ms です。

var fixation = {




 type: 'html-keyboard-response',


 stimulus: '<div style="font-size:60px;">+</div>',


 choices: jsPsych.NO_KEYS,


 trial_duration: 1000,


}


　この html-keyboard-response では反応を受け付けないという特殊なケースですが、もちろん特定のキーのみ受け付けて、それを記録できます。公式ドキュメント（ https://www.jspsych.org/7.2/plugins/html-keyboard-response/ ）を参照すると、より細かい指定がわかります。ここでのレスポンスは記録されます。

さて、
jsPsych
basic
jsPsych.init
timeline
response
html-keyboard-response
audio-keyboard-response
type, stimulus, data, choice など
preload
advanced
timeline_variables: リストを回す際に必須
on_finish （反応の正誤の記録など）
　



2.3. URLの発行と公開


var, list, str, num, dict 

