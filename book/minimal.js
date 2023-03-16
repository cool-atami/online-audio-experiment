//jsPsychの初期化
var jsPsych = initJsPsych({
    use_webaudio: false,
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

//プラグイン
var welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus:'実験に協力していただき、ありがとうございます。',
    choices: ['次へ'], 
    response_ends_trial: true,
};

//ユーザー定義の時間軸に沿って実行する
jsPsych.run([
    welcome
]);
