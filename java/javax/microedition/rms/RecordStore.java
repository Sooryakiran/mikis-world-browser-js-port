package javax.microedition.rms;

import java.util.Arrays;
import java.util.Base64;
import web.Browser;

public final class RecordStore {
    private final String name;
    private RecordStore(String name) { this.name = name; }
    public static RecordStore openRecordStore(String name, boolean create) {
        if (!Browser.storeExists(name)) {
            if (!create) throw new IllegalStateException("Record store does not exist: " + name);
            Browser.storeCreate(name);
        }
        return new RecordStore(name);
    }
    public static void deleteRecordStore(String name) { Browser.storeDelete(name); }
    public int getNumRecords() { return Browser.storeCount(name); }
    public byte[] getRecord(int id) { return Base64.getDecoder().decode(Browser.storeRead(name, id)); }
    public int addRecord(byte[] data, int offset, int length) {
        int id = getNumRecords() + 1;
        setRecord(id, data, offset, length);
        return id;
    }
    public void setRecord(int id, byte[] data, int offset, int length) {
        Browser.storeWrite(name, id, Base64.getEncoder().encodeToString(Arrays.copyOfRange(data, offset, offset + length)));
    }
    public void closeRecordStore() {}
}
