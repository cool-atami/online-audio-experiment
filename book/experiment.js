// timeline_variables は事前に読み込んでいる前提
var list_audio_preload = timeline_variables.map(function(obj) {
    // a, b, x が読み込む対象の刺激
    return [obj.a, obj.b, obj.x];
}).flat(1);


var jsPsych = initJsPsych({
    use_webaudio: false,
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    choices: [' '],
    stimulus: `
    <p>　実験へのご参加ありがとうございます。
    この弁別実験の各課題では a -> b -> x という順序で 3つの音を聞いてもらい、
    3つ目の音(x)が似ているのが
    (a)1つ目の音か (b)2つ目の音か を a か b のキーで答えてもらいます。
    静かな環境で、可能な場合はイヤホンなどの装着をお願いいたします。
    スペースキーで始めます。
    </p>
  `,
};

var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
}

var trial_a = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: jsPsych.timelineVariable('a'),
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    post_trial_gap: 200,
};

var trial_b = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: jsPsych.timelineVariable('b'),
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    post_trial_gap: 200,
};

var trial_x = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: jsPsych.timelineVariable('b'),
    choices: jsPsych.NO_KEYS,
    trial_ends_after_audio: true,
    // post_trial_gap: 200,  // 最後は不要
};

var axb_question = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '音声呈示は a -> b -> x の順でした。',
    choices: ['a', 'b'],
    prompt: "<p> 3つ目の音(x)は1つ目の音(a)と2つ目の音(b)のどちらに似ていますか。</p>",
    data: {
        task: 'axb', // production--perception-categorization
        type: jsPsych.timelineVariable('type'), // filler--target
        item_id: jsPsych.timelineVariable('item_id'),
        correct: jsPsych.timelineVariable('correct'),
    },
};

var goodbye = {
    type: 'jsPsychHtmlKeyboardResponse',
    choices: [' '],
    stimulus: `
    <p>　実験へのご参加ありがとうございます。
    スペースキーで終わります。
    </p>
  `,
};

var axb_trial = {
    timeline: [fixation, trial_a, trial_b, trial_x, axb_question],
    timeline_variables: timeline_variables
};

var preload = {
    type: jsPsychPreload,
    audio: list_audio_preload,
}

var timeline = [preload, welcome, axb_trial, goodbye]
jsPsych.run(timeline)
