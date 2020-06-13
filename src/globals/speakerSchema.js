export const speakerImages = [
  "Phoenix_Cool.png",
  "Phoenix_Defiant.png",
  "Phoenix_Despair.png",
  "Phoenix_Serious.png",
  "Phoenix_Shocked.png",
];

export default {
  narrator: {
    image: null,
    name: null,
    voice_file: "default_voice.wav",
    target_object: "NONE",
  },
  phoenix: {
    image: "Phoenix_Serious.png",
    name: "Rocc",
    voice_file: "phoenix_voice.wav",
    target_object: "PhoenixNPC",
  },
  vampire: {
    image: "",
    name: "Vega",
    voice_file: "vampire_voice.wav",
    target_object: "VegaNPC",
  },
  ghost: {
    image: "",
    name: "Cerie",
    voice_file: "ghost_voice.wav",
    target_object: "CerieNPC",
  },
  scientist: {
    image: "",
    name: "Scientist",
    voice_file: "scientist_voice.wav",
    target_object: "AdaNPC",
  },
  default: {
    image: null,
    name: null,
    voice_file: "default_voice.wav",
  },
  phoenix_unknown: {
    image: null,
    name: "???",
    voice_file: "phoenix_voice.wav",
    target_object: "PhoenixNPC",
  },
  vampire_unknown: {
    image: null,
    name: "???",
    voice_file: "vampire_voice.wav",
    target_object: "VegaNPC",
  },
  ghost_unknown: {
    image: null,
    name: "???",
    voice_file: "ghost_voice.wav",
    target_object: "CerieNPC",
  },
  scientist_unknown: {
    image: null,
    name: "???",
    voice_file: "scientist_voice.wav",
    target_object: "AdaNPC",
  },
};
