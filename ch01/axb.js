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
};

// TIMELINE
var timeline = [];
timeline.push(axb_instructions_practice);
timeline.push(fixation);
timeline.push(trial_a);
timeline.push(trial_x);
timeline.push(trial_b);
timeline.push(axb_question);

jsPsych.init({
    timeline: timeline,
    on_finish: function(){
       jsPsych.data.displayData();
    }
});

// FIXME:
// Preload をしないから、最初のトライアルがもっさりする。
// timelineを使ってい兄のでtrial_a みたいなのをたくさん書かないといけない。
// onfinish がないから feedback ができない。
// randomize もされていない。
