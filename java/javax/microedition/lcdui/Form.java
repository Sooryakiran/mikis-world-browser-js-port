package javax.microedition.lcdui;

import java.util.ArrayList;
import web.Browser;

public final class Form extends Screen {
    public final ArrayList<Object> items = new ArrayList<>();
    public Form(String title) { this.title = title; }
    public int append(String text) { items.add(text); dirty = true; return items.size() - 1; }
    public int append(Item item) { items.add(item); dirty = true; return items.size() - 1; }
    public void delete(int index) { items.remove(index); dirty = true; }
    public int size() { return items.size(); }
    @Override public void render() {
        super.render();
        for (int i = 0; i < items.size(); i++) {
            Object item = items.get(i);
            if (item instanceof TextField) {
                TextField text = (TextField) item;
                Browser.textField(text.label, text.getString(), text.max, i);
            } else Browser.paragraph((String) item);
        }
    }
}
