package main;

import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by v.chibrikov on 13.09.2014.
 */
public class AccountService {
    private Map<String, UserProfile> users = new HashMap<>();
    private Map<String, UserProfile> sessions = new HashMap<>();


    public boolean addUser(String userName, UserProfile userProfile) {
        assert users != null;
        if (users.containsKey(userName))
            return false;
        users.put(userName, userProfile);
        return true;
    }

    public void addSessions(String sessionId, UserProfile userProfile) {
        assert sessions != null;
        sessions.put(sessionId, userProfile);
    }

    public void removeSession(String sessionId) {
        assert sessions != null;
        sessions.remove(sessionId);
    }

    @Nullable
    public UserProfile getUser(@Nullable String userName) {
        assert users != null;
        if (users.containsKey(userName))
            return users.get(userName);
        return null;
    }

    @Nullable
    public UserProfile getSessions(String sessionId) {
        assert sessions != null;
        if (sessions.containsKey(sessionId))
            return sessions.get(sessionId);
        return null;
    }
}
