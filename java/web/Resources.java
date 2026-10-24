package web;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public final class Resources {
    public static InputStream open(Class<?> owner, String name) {
        int length = Browser.resourceLength(name);
        if (length < 0) return null;
        byte[] data = new byte[length];
        for (int i = 0; i < length; i++) data[i] = (byte) Browser.resourceByte(name, i);
        return new ByteArrayInputStream(data);
    }
}
