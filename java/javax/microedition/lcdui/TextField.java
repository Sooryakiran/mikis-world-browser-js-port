package javax.microedition.lcdui;

public final class TextField extends Item {
    public final String label;
    public int max;
    private String value;
    public TextField(String label, String text, int max, int constraints) {
        this.label = label;
        this.max = max;
        setString(text);
    }
    public String getString() { return value; }
    public void setString(String text) { value = text.substring(0, Math.min(max, text.length())); }
    public int setMaxSize(int max) { this.max = max; setString(value); return max; }
}
