package javax.microedition.lcdui;

import web.Browser;

public final class Font {
    public final int size;
    private Font(int size) { this.size = size; }
    public static Font getFont(int face, int style, int size) { return new Font(size == 8 ? 10 : size == 16 ? 14 : 12); }
    public int getHeight() { return size + 2; }
    public int stringWidth(String value) { return Browser.measure(value, size); }
}
