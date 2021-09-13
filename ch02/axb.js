//   { a: "espo-1.wav", x: "espo-2.wav", b: "esupo-3.wav", correct: 'b', task: "axb-practice" },
//   { a: "ezubo-1.wav", x: "ezbo-2.wav", b: "ezbo-3.wav",
var list_audio_preload = ['eSpo.wav','eSupo.wav','etsto-L_H-3.wav','etsu-HL-3.wav','ebuzo-2.wav','ebuzo-3.wav','edzugo-1.wav','etsto-L_H-2.wav','edzugo-3.wav','ebuzo-1.wav','edzugo-2.wav','etsu-HL-1.wav','etsto-L_H-1.wav','etsuto-HLL-3.wav','edzgo-2.wav','ets-L_-3.wav','esuko-LHH-1.wav','epso-1.wav','ets-L_-2.wav','edzgo-3.wav','edzgo-1.wav','epso-2.wav','epso-3.wav','esuko-LHH-3.wav','ets-L_-1.wav','etsuto-HLL-1.wav','ezubo-1.wav','etsuko-1.wav','esuko-LLH-1.wav','ebzo-1.wav','etsuto-HHL-3.wav','ezubo-2.wav','etsuto-HHL-1.wav','etsuko-2.wav','ebzo-3.wav','esuko-LLH-3.wav','ebzo-2.wav','etsuko-3.wav','ezubo-3.wav','esko-L_H-3.wav','ekto-1.wav','esko-L_H-2.wav','etsu-LL-3.wav','es-L_-1.wav','es-L_-3.wav','etsu-LL-1.wav','ekto-3.wav','ekto-2.wav','esko-L_H-1.wav','es-L_-2.wav','ekuto-1.wav','esu-HL-1.wav','egudo-2.wav','ezbo-3.wav','esko-H_L-1.wav','ezbo-2.wav','egudo-3.wav','ekuto-2.wav','egudo-1.wav','esko-H_L-3.wav','esko-H_L-2.wav','ezbo-1.wav','esu-HL-3.wav','ekuto-3.wav','etsuto-LHH-1.wav','esuko-HLL-3.wav','esupo-2.wav','esupo-3.wav','epuso-1.wav','epuso-3.wav','esupo-1.wav','esuko-HLL-1.wav','epuso-2.wav','etsuto-LHH-3.wav','espo-3.wav','etsko-3.wav','esuko-HHL-3.wav','etsko-2.wav','espo-2.wav','etsuto-LLH-1.wav','etsuto-LLH-3.wav','esuko-HHL-1.wav','etsko-1.wav','espo-1.wav','egdo-1.wav','esu-LL-1.wav','etsto-H_L-1.wav','etsto-H_L-3.wav','esu-LL-3.wav','egdo-2.wav','egdo-3.wav','etsto-H_L-2.wav'];

var preload = {
  type: 'preload',
  audio: list_audio_preload,
}

var axb_instructions_practice = {
  type: "html-keyboard-response",
  choices: [' '],
  stimulus: `
    <p>　この弁別実験の各課題では a -> x -> b という順序で 3つの音を聞いてもらい、
    2つ目の音(x)が似ているのが
    (a)1つ目の音か (b)3つ目の音か を a か b のキーで答えてもらいます。
    静かな環境で、可能な場合はイヤホンなどの装着をお願いいたします。
    スペースキーを押すと練習課題を2問呈示いたします。
    </p>
  `,
};


var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
}

var trial_a = {
  type: 'audio-keyboard-response',
  stimulus: jsPsych.timelineVariable('a'),
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  post_trial_gap: 200,
};

var trial_x = {
  type: 'audio-keyboard-response',
  stimulus: jsPsych.timelineVariable('x'),
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
  post_trial_gap: 200,
};

var trial_b = {
  type: 'audio-keyboard-response',
  stimulus: jsPsych.timelineVariable('b'),
  choices: jsPsych.NO_KEYS,
  trial_ends_after_audio: true,
};

var axb_question = {
  type: 'html-keyboard-response',
  stimulus: '音声呈示は a -> x -> b の順でした。',
  choices: ['a', 'b'],
  prompt: "<p> 2つ目の音(x)は1つ目の音(a)と3つ目の音(b)のどちらに似ていますか。</p>",
  data: {
    task: 'axb',  // production--perception-categorization
    type: jsPsych.timelineVariable('type'),  // filler--target
    item_id: jsPsych.timelineVariable('item_id'),
    correct: jsPsych.timelineVariable('correct'),
  },
  on_finish: function (data) {
    data.is_correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct);
  },
};

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

//Practice
var practice_stimuli = [
  { a: "espo-1.wav", x: "espo-2.wav", b: "esupo-3.wav", correct: 'b', task: "axb-practice" },
  { a: "ezubo-1.wav", x: "ezbo-2.wav", b: "ezbo-3.wav", correct: 'a', task: "axb-practice" },
];

var axb_practice = {
  timeline: [fixation, trial_a, trial_x, trial_b, axb_question, feedback],
  timeline_variables: practice_stimuli
};

// TIMELINE
var timeline = [];
timeline.push(axb_instructions_practice);
timeline.push(axb_practice);

jsPsych.init({
    timeline: timeline,
    on_finish: function(){
       jsPsych.data.displayData();
    }
});
