package main;


import base.AccountService;
import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by v.chibrikov on 13.09.2014.
 */
public class AccountServiceImpl implements AccountService {
    private Map<String, UserProfile> users = new HashMap<>();
    private Map<String, UserProfile> sessions = new HashMap<>();

    @Override
    public boolean addUser(String userName, UserProfile userProfile) {
        assert users != null;
        if (users.containsKey(userName))
            return false;
        users.put(userName, userProfile);
        return true;
    }

    @Override
    public void addSessions(String sessionId, UserProfile userProfile) {
        assert sessions != null;
        sessions.put(sessionId, userProfile);
    }

    @Override
    public void removeSession(String sessionId) {
        assert sessions != null;
        sessions.remove(sessionId);
    }

    @Override
    @Nullable
    public UserProfile getUser(String userName) {
        assert users != null;
        if (users.containsKey(userName))
            return users.get(userName);
        return null;
    }

    @Override
    @Nullable
    public UserProfile getSessions(String sessionId) {
        assert sessions != null;
        if (sessions.containsKey(sessionId))
            return sessions.get(sessionId);
        return null;
    }

    @Override
    public int getSignedInNumber() {
        return sessions.size();
    }

    @Override
    public int getRegisteredNumber() {
        return users.size();
    }
}
