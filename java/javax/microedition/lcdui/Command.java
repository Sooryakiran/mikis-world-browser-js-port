package javax.microedition.lcdui;

public final class Command {
    public final String label;
    public final int type;
    public final int priority;
    public Command(String label, int type, int priority) {
        this.label = label;
        this.type = type;
        this.priority = priority;
    }
}
