package javax.microedition.lcdui;

import web.Browser;

public final class Graphics {
    private final int target;
    private final int width, height;
    private int tx, ty, cx, cy, cw, ch, color;
    private Font font = Font.getFont(0, 0, 0);
    public Graphics(int target) {
        this.target = target;
        width = Browser.width(target);
        height = Browser.height(target);
        cw = width;
        ch = height;
    }
    public void setColor(int red, int green, int blue) { color = (red << 16) | (green << 8) | blue; }
    public void setFont(Font font) { this.font = font; }
    public void translate(int x, int y) { tx += x; ty += y; }
    public void setClip(int x, int y, int w, int h) {
        int right = Math.min(width, x + tx + Math.max(0, w));
        int bottom = Math.min(height, y + ty + Math.max(0, h));
        cx = Math.max(0, x + tx);
        cy = Math.max(0, y + ty);
        cw = Math.max(0, right - cx);
        ch = Math.max(0, bottom - cy);
    }
    public void clipRect(int x, int y, int w, int h) {
        int right = Math.min(cx + cw, x + tx + Math.max(0, w));
        int bottom = Math.min(cy + ch, y + ty + Math.max(0, h));
        cx = Math.max(cx, x + tx);
        cy = Math.max(cy, y + ty);
        cw = Math.max(0, right - cx);
        ch = Math.max(0, bottom - cy);
    }
    public int getClipX() { return cx - tx; }
    public int getClipY() { return cy - ty; }
    public int getClipWidth() { return cw; }
    public int getClipHeight() { return ch; }
    public void drawImage(Image image, int x, int y, int anchor) {
        if ((anchor & 8) != 0) x -= image.getWidth();
        else if ((anchor & 1) != 0) x -= image.getWidth() / 2;
        if ((anchor & 32) != 0) y -= image.getHeight();
        else if ((anchor & 2) != 0) y -= image.getHeight() / 2;
        Browser.drawImage(target, image.handle, x + tx, y + ty, cx, cy, cw, ch);
    }
    public void fillRect(int x, int y, int w, int h) {
        Browser.rect(target, x + tx, y + ty, w, h, color, true, cx, cy, cw, ch);
    }
    public void drawRect(int x, int y, int w, int h) {
        Browser.rect(target, x + tx, y + ty, w, h, color, false, cx, cy, cw, ch);
    }
    public void drawString(String value, int x, int y, int anchor) {
        Browser.text(target, value, x + tx, y + ty, anchor, font.size, color, cx, cy, cw, ch);
    }
}
