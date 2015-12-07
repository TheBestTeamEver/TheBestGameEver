package main;

import base.AccountService;
import org.jetbrains.annotations.NotNull;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by supergood on 15.11.15.
 */
public class AccountServiceTest {
    @NotNull
    private final AccountService accountService = new AccountServiceImpl();
    @NotNull
    private final UserProfile testUser = new UserProfile("testLogin", "testPassword", "test@email");
    private Map<String, UserProfile> testUsers = new HashMap<>();
    private Map<String, UserProfile> testSessions = new HashMap<>();

    @Test
    public void testAddUser() throws Exception {
        accountService.addUser(testUser.getLogin(), testUser);

        final UserProfile userProfile = accountService.getUser(testUser.getLogin());

        assertNotNull(userProfile);
        assertEquals(testUser.getLogin(), userProfile.getLogin());
        assertEquals(testUser.getPassword(), userProfile.getPassword());
        assertEquals(testUser.getEmail(), userProfile.getEmail());
        assertFalse(accountService.addUser(testUser.getLogin(), testUser));
    }

    @Test
    public void testAddSessions() throws Exception {
        accountService.addSessions("1", testUser);

        assertNotNull(accountService.getSessions("1"));
        assertNull(accountService.getSessions("2"));
    }

    @Test
    public void testRemoveSession() throws Exception {
        accountService.addSessions("1", testUser);
        accountService.removeSession("1");
        assertNull(accountService.getSessions("1"));
    }

    @Test
    public void testGetUser() throws Exception {
        assertNull(accountService.getUser("1"));
    }

    @Test
    public void testGetSessions() throws Exception {
        accountService.addSessions("1", testUser);
        assertEquals(accountService.getSessions("1"), testUser);
    }

    @Test
    public void testGetSignedInNumber() throws Exception {
        assertEquals(accountService.getSignedInNumber(), 0);
        accountService.addSessions("1", testUser);
        assertEquals(accountService.getSignedInNumber(), 1);
    }

    @Test
    public void testGetRegisteredNumber() throws Exception {
        assertEquals(accountService.getRegisteredNumber(), 0);
        accountService.addUser("1", testUser);
        assertEquals(accountService.getRegisteredNumber(), 1);
    }
}