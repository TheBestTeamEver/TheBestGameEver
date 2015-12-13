package main;

import base.AccountService;
import base.DBService;
import base.dataSets.UserDataSet;
import dbService.DBServiceImpl;
import org.hibernate.exception.ConstraintViolationException;
import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by pavel on 13.12.15.
 */
public class AccountServiceDBImpl implements AccountService {
    DBService dbService = new DBServiceImpl();
    private Map<String, UserProfile> sessions = new HashMap<>();


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
    public boolean addUser(String userName, UserProfile userProfile) {
        try{
            dbService.save(new UserDataSet(userProfile.getLogin(), userProfile.getEmail(), userProfile.getPassword()));
            return true;
        }
        catch (ConstraintViolationException exp){
            return false;
        }
    }


    @Nullable
    @Override
    public UserProfile getUser(String userName) {
        UserDataSet dataSet = dbService.readByName(userName);
        if(dataSet != null){
            return new UserProfile(dataSet.getName(), dataSet.getPassword(), dataSet.getEmail());
        }
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
        List<UserDataSet> dataSets = dbService.readAll();
        return dataSets.size();
    }
}
