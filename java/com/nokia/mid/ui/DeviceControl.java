package com.nokia.mid.ui;

import web.Browser;

public final class DeviceControl {
    public static void setLights(int number, int level) {
        // Physical backlight control has no browser equivalent.
    }
    public static void startVibra(int strength, long duration) { Browser.vibrate((int) duration); }
    public static void stopVibra() { Browser.vibrate(0); }
}
