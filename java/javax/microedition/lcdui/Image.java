package javax.microedition.lcdui;

import web.Browser;

public final class Image {
    public final int handle;
    private Image(int handle) { this.handle = handle; }
    public static Image createImage(String name) { return new Image(Browser.image(name)); }
    public static Image createImage(int width, int height) { return new Image(Browser.surface(width, height)); }
    public int getWidth() { return Browser.width(handle); }
    public int getHeight() { return Browser.height(handle); }
    public Graphics getGraphics() { return new Graphics(handle); }
}
