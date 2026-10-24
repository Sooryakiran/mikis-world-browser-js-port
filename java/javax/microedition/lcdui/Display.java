package javax.microedition.lcdui;

import javax.microedition.midlet.MIDlet;

public final class Display {
    public static final Display instance = new Display();
    private Displayable current;
    public static Display getDisplay(MIDlet midlet) { return instance; }
    public Displayable getCurrent() { return current; }
    public void setCurrent(Displayable next) {
        if (current == next) return;
        if (current != null) current.hideNotify();
        current = next;
        current.dirty = true;
        current.showNotify();
    }
    public void refresh() {
        if (current != null && current.dirty) current.render();
    }
    public void key(int code, boolean down) {
        if (current instanceof Canvas) ((Canvas) current).dispatchKey(code, down);
    }
    public void command(int index) {
        Displayable screen = current;
        if (screen != null && screen.listener != null && index >= 0 && index < screen.commands.size()) {
            screen.listener.commandAction(screen.commands.get(index), screen);
            refresh();
        }
    }
    public void select(int index) {
        if (current instanceof List) {
            List list = (List) current;
            list.selected = index;
            if (list.listener != null) list.listener.commandAction(List.SELECT_COMMAND, list);
            refresh();
        }
    }
    public void text(int index, String value) {
        if (current instanceof Form) {
            Object item = ((Form) current).items.get(index);
            if (item instanceof TextField) ((TextField) item).setString(value);
        }
    }
}
