package javax.microedition.lcdui;

public abstract class Screen extends Displayable {
    public void setTitle(String title) { this.title = title; dirty = true; }
}
