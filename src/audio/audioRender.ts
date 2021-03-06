import {Piano} from "./instruments/piano";
import {Instrument} from "../constants";
import {NotesPlayer} from "./nodes/NotesPlayer";
import {Bass} from "./instruments/bass";
import {Clarinet} from "./instruments/clarinet";
import {Cello} from "./instruments/cello";
import {Flute} from "./instruments/flute";
import {Guitar} from "./instruments/guitar";
import {Harp} from "./instruments/harp";
import {Trumpet} from "./instruments/trumpet";
import {Violin} from "./instruments/violin";
import {Drums} from "./instruments/drums";
import {Notes} from "../state/notes";

export const AFTER_RELEASE = 5;

const synths: Record<Instrument, NotesPlayer> & {drums: Drums} = {
    bass: new Bass(),
    cello: new Cello(),
    clarinet: new Clarinet(),
    drums: new Drums(),
    flute: new Flute(),
    guitar: new Guitar(),
    harp: new Harp(),
    piano: new Piano(),
    trumpet: new Trumpet(),
    violin: new Violin()
};

const sampleRate = 44100;
export async function render(notes: Notes, duration: number): Promise<AudioBuffer> {
    const ctx = new OfflineAudioContext(1, (duration + 2) * sampleRate, sampleRate);

    const gain = ctx.createGain();
    gain.gain.value = 0.2;
    gain.connect(ctx.destination);

    const promises = Object.values(synths).map(it => it.schedule(ctx, gain, notes));
    await Promise.all(promises);

    return await ctx.startRendering();
}

export function drumDuration(token: number): number {
    return synths.drums.durationOf(token);
}