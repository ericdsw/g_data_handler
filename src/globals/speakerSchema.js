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

  robin: {
		image: null,
		name: "SPEAKER_NAME_ROBIN",
		voice_file: "default_voice.wav",
		target_object: "RobinNPC",
    speakerImages: []
	},

	johann: {
		image: null,
		name: "SPEAKER_NAME_JOHANN",
		voice_file: "default_voice.wav",
		target_object: "JohannNPC",
    speakerImages: []
	}
  
  "claire": {
		"image": null,
		"name": "SPEAKER_NAME_CLAIRE",
		"voice_file": "default_voice.wav",
		"target_object": "ClaireNPC",
    speakerImages: []
	},
	
	"seledon": {
		"image": null,
		"name": "SPEAKER_NAME_SELEDON",
		"voice_file": "default_voice.wav",
		"target_object": "SeledonNPC",
    speakerImages: []
	},
	
	"cimmeria": {
		"image": null,
		"name": "SPEAKER_NAME_CIMMERIA",
		"voice_file": "default_voice.wav",
		"target_object": "CimmeriaNPC",
    speakerImages: []
	},
	
	"dillens": {
		"image": null,
		"name": "SPEAKER_NAME_DILLENS",
		"voice_file": "default_voice.wav",
		"target_object": "DillensNPC",
    speakerImages: []
	},
	
	"ian": {
		"image": null,
		"name": "SPEAKER_NAME_IAN",
		"voice_file": "default_voice.wav",
		"target_object": "IanNPC",
    speakerImages: []
	},
	
	"ferban": {
		"image": null,
		"name": "SPEAKER_NAME_FERBAN",
		"voice_file": "default_voice.wav",
		"target_object": "FerbanNPC",
    speakerImages: []
	},
	
	"sandest": {
		"image": null,
		"name": "SPEAKER_NAME_SANDEST",
		"voice_file": "default_voice.wav",
		"target_object": "SandestNPC",
    speakerImages: []
	},
	
	"relma": {
		"image": null,
		"name": "SPEAKER_NAME_RELMA",
		"voice_file": "default_voice.wav",
		"target_object": "RelmaNPC",
    speakerImages: []
	},
	
	"dad": {
		"image": null,
		"name": "SPEAKER_NAME_DAD",
		"voice_file": "default_voice.wav",
		"target_object": "DadNPC",
    speakerImages: []
	}

};

export default speakerSchema;
