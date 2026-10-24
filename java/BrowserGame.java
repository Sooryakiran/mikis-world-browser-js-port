import javax.microedition.lcdui.Display;
import javax.microedition.midlet.MIDlet;
import web.Browser;

public final class BrowserGame {
    public static void main(String[] args) {
        GameMIDlet game = new GameMIDlet();
        game.startApp();
        Browser.bind(() -> {
            if (!MIDlet.destroyed) {
                game.run();
                Display.instance.refresh();
            }
        }, (code, down) -> Display.instance.key(code, down),
        index -> Display.instance.command(index),
        index -> Display.instance.select(index),
        (index, value) -> Display.instance.text(index, value),
        () -> game.pauseApp(),
        () -> {
            if (Display.instance.getCurrent() instanceof javax.microedition.lcdui.Canvas) {
                Display.instance.getCurrent().showNotify();
            }
        }, () -> java.util.Arrays.toString(game.webGame().webState()));
        Display.instance.refresh();
    }
}
