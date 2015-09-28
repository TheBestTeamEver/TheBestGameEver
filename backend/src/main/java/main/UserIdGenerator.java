package main;

/**
 * Created by Stanislav on 25.09.15.
 */
public class UserIdGenerator {
    private long id = 0;

    public long getAndIncrement() {
        return id++;
    }
}
