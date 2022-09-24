2. jsPsych の基本的な機能を確認

　ここから書いてあることは基本的に公式ドキュメント（ https://www.jspsych.org/ ）に書いてあるとおりです。ただ読み慣れていないと辛いので、補足として記述していきます。
2.1. timeline

　さて、それでは1.3でコピペしたミニマル実験のスクリプトの中身を見ていきましょう。まずは var timeline の定義から確認します。timeline という配列を作り、preloadやaxb_instructions_practice、fixation を push というメソッドを使って timeline に追加していっています。そして AXB課題のそれぞれである trial_a、trial_x、そして trial_bを追加し、最後に被験者に判定を求める axb_question を追加しています。




// TIMELINE




var timeline = [];


timeline.push(preload);


timeline.push(axb_instructions_practice);


timeline.push(fixation);


timeline.push(trial_a);


timeline.push(trial_x);


timeline.push(trial_b);


timeline.push(axb_question);






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

