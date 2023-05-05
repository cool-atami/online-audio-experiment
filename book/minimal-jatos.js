var jsPsych = initJsPsych({ //jsPsychの初期化(Jatosバージョン)
    use_webaudio: false,
    on_trial_start: jatos.addAbortButton,
    on_finish: () => jatos.endStudy(jsPsych.data.get().json())
});

//プラグイン
var welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '実験に協力していただき、ありがとうございます。',
    choices: ['完了（反応時間などを記録します）'],
    response_ends_trial: true,
};

//ユーザー定義の時間軸に沿って実行する
jatos.onLoad(() => {
    jsPsych.run([welcome]);
});
