package javax.microedition.lcdui;

import java.util.ArrayList;
import java.util.Comparator;
import web.Browser;

public abstract class Displayable {
    public final ArrayList<Command> commands = new ArrayList<>();
    public CommandListener listener;
    public String title = "";
    public boolean dirty = true;
    public void addCommand(Command command) {
        if (!commands.contains(command)) {
            commands.add(command);
            commands.sort(Comparator.comparingInt(value -> value.priority));
            dirty = true;
        }
    }
    public void removeCommand(Command command) { commands.remove(command); dirty = true; }
    public void setCommandListener(CommandListener listener) { this.listener = listener; }
    public void showNotify() {}
    public void hideNotify() {}
    public void render() {
        Browser.beginScreen(title, this instanceof Canvas ? 0 : 1);
        for (int i = 0; i < commands.size(); i++) Browser.command(commands.get(i).label, i);
        dirty = false;
    }
}
