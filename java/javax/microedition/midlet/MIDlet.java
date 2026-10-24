package javax.microedition.midlet;

import web.Browser;

public abstract class MIDlet {
    public static boolean destroyed;
    public abstract void startApp();
    public abstract void pauseApp();
    public abstract void destroyApp(boolean unconditional);
    public final void notifyDestroyed() {
        destroyed = true;
        Browser.destroyed();
    }
}
