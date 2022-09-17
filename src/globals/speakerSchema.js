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
      'Ada-fix-glasses-glare.png'
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
    speakerImages: []
  },

  controllable_cerie: {
    image: 'Cerie-Portrait-Neutral.png',
    name: 'Cerie',
    voice_file: 'ghost_voice.wav',
    target_object: 'CONTROL_PLAYER',
    speakerImages: []
  },
  
};

export default speakerSchema;
