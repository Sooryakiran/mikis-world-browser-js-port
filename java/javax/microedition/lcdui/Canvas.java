package javax.microedition.lcdui;

public abstract class Canvas extends Displayable {
    protected abstract void paint(Graphics graphics);
    protected void keyPressed(int code) {}
    protected void keyReleased(int code) {}
    protected void keyRepeated(int code) {}
    public final void dispatchKey(int code, boolean down) {
        if (down) keyPressed(code); else keyReleased(code);
    }
    public int getWidth() { return 176; }
    public int getHeight() { return 144; }
    public boolean isDoubleBuffered() { return true; }
    public int getGameAction(int code) {
        switch (code) {
            case 50: case -1: return 1;
            case 52: case -3: return 2;
            case 54: case -4: return 5;
            case 56: case -2: return 6;
            case 53: case -5: return 8;
            default: return 0;
        }
    }
    private boolean repaint;
    public void repaint() { repaint = true; }
    public void serviceRepaints() {
        if (repaint) {
            repaint = false;
            paint(new Graphics(0));
        }
    }
}
