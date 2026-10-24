package com.nokia.mid.sound;

import web.Browser;

public final class Sound {
    private final int handle;
    public Sound(byte[] data, int type) {
        if (type != 1) throw new IllegalArgumentException("Only Nokia OTT sound is used by this game");
        handle = Browser.newSound(data.length);
        for (int i = 0; i < data.length; i++) Browser.soundByte(handle, i, data[i] & 255);
    }
    public void play(int count) { Browser.playSound(handle, count); }
    public void stop() { Browser.stopSound(handle); }
}
