package javax.microedition.lcdui;

import java.util.ArrayList;
import web.Browser;

public final class List extends Screen {
    public static final Command SELECT_COMMAND = new Command("Select", 1, 0);
    private final ArrayList<String> items = new ArrayList<>();
    public int selected;
    public List(String title, int type) { this.title = title; }
    public int append(String label, Image image) { items.add(label); dirty = true; return items.size() - 1; }
    public int getSelectedIndex() { return selected; }
    @Override public void render() {
        super.render();
        for (int i = 0; i < items.size(); i++) Browser.listItem(items.get(i), i);
    }
}
