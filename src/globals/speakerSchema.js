const speakerSchema = {
  narrator: {
    image: null,
    name: null,
    voice_file: 'default_voice.wav',
    target_object: 'NONE',
    speakerImages: [],
  },

  phoenix: {
    image: 'Phoenix_Serious.png',
    name: 'Rocc',
    voice_file: 'phoenix_voice.wav',
    target_object: 'PhoenixNPC',
    speakerImages: [
      'Phoenix_Cool.png',
      'Phoenix_Defiant.png',
      'Phoenix_Despair.png',
      'Phoenix_Serious.png',
      'Phoenix_Shocked.png',
      'Phoenix-sobbing.png',
      'Phoenix-happy.png',
      'Phoenix-crying.png',
      'Phoenix-angry.png',
    ],
  },

  vampire: {
    image: 'Vega_mask_neutral.png',
    name: 'Vega',
    voice_file: 'vampire_voice.wav',
    target_object: 'VegaNPC',
    speakerImages: [
      'Vega_mask_laughing.png',
      'Vega_mask_menacing_sans.png',
      'Vega_mask_menacing.png',
      'Vega_mask_neutral.png',
      'Vega_mask_aggro.png',
      'Vega_mask_curious.png',
      'Vega_mask_pensive_left.png',
      'Vega_mask_pensive_right.png',
      'uvega_angry.png',
      'uvega_mad.png',
      'vega-damaged-ashamed-away.png',
      'vega-damaged-ashamed-away_2.png',
      'vega-damaged-ashamed-straight.png',
      'vega-damaged-determined.png'
    ],
  },

  ghost: {
    image: 'Cerie-Portrait-Neutral.png',
    name: 'Cerie',
    voice_file: 'ghost_voice.wav',
    target_object: 'CerieNPC',
    speakerImages: [
      'Cerie-Portrait-Shocked.png',
      'Cerie-Portrait-Crying.png',
      'Cerie-Portrait-Hmm.png',
      'Cerie-Portrait-Wink.png',
      'Cerie-Portrait-Tongue.png',
      'Cerie-Portrait-Smile.png',
      'Cerie-Portrait-Neutral.png',
      'Cerie-Portrait-ECSmile.png',
      'Cerie-Portrait-Laugh.png',
      'Cerie-Portrait-Angry.png',
      'Cerie-Portrait-Baffled.png',
      'Cerie-Portrait-Confident.png',
      'Cerie-Portrait-Confused.png',
      'Cerie-Portrait-Frowned-v2.png',
      'Cerie-Portrait-Worried.png',
      'Cerie-Portrait-WalkieTalkie.png'
    ],
  },

  scientist: {
    image: '',
    name: 'Ada',
    voice_file: 'scientist_voice.wav',
    target_object: 'AdaNPC',
    speakerImages: [
      'Speaker.png',
      'Ada-thunk.png',
      'Ada-thunk-glare.png',
      'Ada-sigh.png',
      'Ada-sigh-glare.png',
      'Ada-serious.png',
      'Ada-serious-glare.png',
      'Ada-sans.png',
      'Ada-releived_glare.png',
      'Ada-releived.png',
      'Ada-fix-glasses.png',
      'Ada-fix-glasses-glare.png',
      'ada-young-thinking.png',
      'ada-young-smug.png',
      'ada-young-smile.png',
      'ada-young-neutral.png',
      'ada-young-hurting.png',
      'ada-research-thinking.png',
      'ada-research-thinking-glare.png',
      'ada-research-neutral.png',
      'ada-research-neutral-glare.png'
    ],
  },

  default: {
    image: null,
    name: null,
    voice_file: 'default_voice.wav',
    speakerImages: [],
  },

  phoenix_unknown: {
    image: null,
    name: '???',
    voice_file: 'phoenix_voice.wav',
    target_object: 'PhoenixNPC',
    speakerImages: [],
  },

  vampire_unknown: {
    image: null,
    name: '???',
    voice_file: 'vampire_voice.wav',
    target_object: 'VegaNPC',
    speakerImages: [],
  },

  ghost_unknown: {
    image: null,
    name: '???',
    voice_file: 'ghost_voice.wav',
    target_object: 'CerieNPC',
    speakerImages: [],
  },

  scientist_unknown: {
    image: null,
    name: '???',
    voice_file: 'scientist_voice.wav',
    target_object: 'AdaNPC',
    speakerImages: [],
  },

  main_character: {
    image: null,
    name: '',
    voice_file: 'default_voice.wav',
    target_object: 'CONTROL_PLAYER',
    speakerImages: [],
  },

  controllable_rocc: {
    name: 'Rocc',
    voice_file: 'phoenix_voice.wav',
    target_object: 'CONTROL_PLAYER',
    speakerImages: [],
  },

  controllable_vega: {
    name: 'Vega',
    voice_file: 'vampire_voice.wav',
    target_object: 'CONTROL_PLAYER',
    speakerImages: [],
  },

  controllable_cerie: {
    image: 'kidcerie-portrait-neutral.png',
    name: 'Cerie',
    voice_file: 'ghost_voice.wav',
    target_object: 'CONTROL_PLAYER',
    speakerImages: [
      'kidcerie-portrait-taunt.png',
      'kidcerie-portrait-smug.png',
      'kidcerie-portrait-worried.png',
      'kidcerie-portrait-bummed.png',
      'kidcerie-portrait-hype.png',
      'kidcerie-portrait-neutral.png',
    ],
  },

  controllable_ada: {
    image: '',
    name: 'Ada',
    voice_file: 'scientist_voice.wav',
    target_object: 'CONTROL_PLAYER',
    speakerImages: [],
  },

  robin: {
    image: 'robin_neutral.png',
    name: 'SPEAKER_NAME_ROBIN',
    voice_file: 'default_voice.wav',
    target_object: 'RobinNPC',
    speakerImages: [
      'robin_glare.png',
      'robin_neutral.png',
      'robin_sad.png',
      'robin_shocked.png',
      'robin_sigh.png',
      'robin_smile.png',
      'robin_smirk.png',
    ],
  },

  johann: {
    image: 'johann_neutral.png',
    name: 'SPEAKER_NAME_JOHANN',
    voice_file: 'default_voice.wav',
    target_object: 'JohannNPC',
    speakerImages: [
      'johann_glare.png',
      'johann_mad.png',
      'johann_neutral.png',
      'johann_smirk.png',
    ],
  },

  mc_npc: {
    image: null,
    name: 'SPEAKER_NAME_UNKNOWN',
    voice_file: 'default_voice.wav',
    target_object: 'MCNPC',
    speakerImages: [],
  },

  abigail: {
    name: 'SPEAKER_NAME_ABIGAIL',
    voice_file: 'vampire_voice.wav',
    target_object: 'AbigailNPC',
    image: 'Abigail-pris-Neutral.png',
    speakerImages: [
      "Abigail-civ-dishelved-Denial.png",
      "Abigail-civ-dishelved-Pleading.png",
      "Abigail-civ-normal-Angry.png",
      "Abigail-civ-normal-Burning.png",
      "Abigail-civ-normal-Denial.png",
      "Abigail-civ-normal-Distressed.png",
      "Abigail-civ-normal-DistressedIntense.png",
      "Abigail-civ-normal-Hurt.png",
      "Abigail-civ-normal-Neutral.png",
      "Abigail-civ-normal-Pleading.png",
      "Abigail-civ-normal-Shameful.png",
      "Abigail-pris-Angry.png",
      "Abigail-pris-Denial.png",
      "Abigail-pris-Desperate.png",
      "Abigail-pris-Distressed.png",
      "Abigail-pris-DistressedIntense.png",
      "Abigail-pris-Neutral.png",
      "Abigail-pris-Shameful.png"

    ],
  },

  marco: {
    image: "Marco-pris-Chill.png",
    name: 'SPEAKER_NAME_MARCO',
    voice_file: 'phoenix_voice.wav',
    target_object: 'MarcoNPC',
    speakerImages: [
      "Marco-civ-Angry.png",
      "Marco-civ-Concerned.png",
      "Marco-civ-Decided.png",
      "Marco-civ-Hurt.png",
      "Marco-civ-Worried.png",
      "Marco-pris-Chill.png",
      "Marco-pris-Concerned.png",
      "Marco-pris-Smiling.png",
      "Marco-pris-SmilingHard.png"
    ],
  },

  all: {
    image: null,
    name: null,
    voice_file: 'default_voice.wav',
    target_object: 'NONE',
    speakerImages: [],
  },
};

export default speakerSchema;
