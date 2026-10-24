const TEMPOS = [25, 28, 31, 35, 40, 45, 50, 56, 63, 70, 80, 90, 100, 112, 125, 140, 160, 180, 200, 225, 250, 285, 320, 355, 400, 450, 500, 565, 635, 715, 800, 900];

// Nokia Smart Messaging OTA fields are bit-packed, not MIDI or RTTTL text.
export function decodeOtt(bytes) {
  let bit = 0;
  function read(count) {
    if (bit + count > bytes.length * 8) throw new Error(`Truncated OTT at bit ${bit}`);
    let result = 0;
    while (count-- > 0) {
      result = result * 2 + ((bytes[bit >> 3] >> (7 - (bit & 7))) & 1);
      bit++;
    }
    return result;
  }
  if (read(8) !== 2 || read(7) !== 0x25) throw new Error("Not a Nokia OTA ringtone");
  bit = Math.ceil(bit / 8) * 8;
  if (read(7) !== 0x1d || read(3) !== 1) throw new Error("Unsupported Nokia OTA song type");
  let title = "";
  for (let length = read(4); length > 0; length--) title += String.fromCharCode(read(8));
  const count = read(8), patterns = new Map(), notes = [];
  let tempo = 63, octave = 5, style = 0, volume = 8, forever = false;
  for (let i = 0; i < count; i++) {
    if (read(3) !== 0) throw new Error("Expected an OTA pattern header");
    const id = read(2), repeats = read(4), instructions = read(8), pattern = [];
    for (let n = 0; n < instructions; n++) {
      const type = read(3);
      if (type === 1) {
        const pitch = read(4), duration = read(3), modifier = read(2);
        if (pitch > 12 || duration > 5) throw new Error("Invalid OTA note");
        pattern.push({
          frequency: pitch ? 440 * 2 ** ((12 * (octave - 4) + pitch - 10) / 12) : 0,
          duration: 240 / tempo / 2 ** duration * [1, 1.5, 1.75, 2 / 3][modifier],
          gate: [0.875, 1, 0.5][style], volume: volume / 15,
        });
      } else if (type === 2) octave = read(2) + 4;
      else if (type === 3) {
        style = read(2);
        if (style > 2) throw new Error("Invalid OTA articulation");
      } else if (type === 4) tempo = TEMPOS[read(5)];
      else if (type === 5) volume = read(4);
      else throw new Error(`Unsupported OTA instruction ${type}`);
    }
    if (instructions) patterns.set(id, pattern);
    const phrase = patterns.get(id);
    if (!phrase) throw new Error(`Undefined OTA pattern ${id}`);
    if (repeats === 15) forever = true;
    for (let loop = 0; loop <= (repeats === 15 ? 0 : repeats); loop++) notes.push(...phrase);
  }
  return { title, notes, forever, duration: notes.reduce((sum, note) => sum + note.duration, 0) };
}
