package base;

import main.UserProfile;


public interface AccountService {
    boolean addUser(String userName, UserProfile userProfile);

    void addSessions(String sessionId, UserProfile userProfile);

    void removeSession(String sessionId);

    UserProfile getUser(String userName);

    UserProfile getSessions(String sessionId);

    int getSignedInNumber();

    int getRegisteredNumber();
}
