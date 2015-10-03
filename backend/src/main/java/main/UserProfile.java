package main;

/**
 * Created by v.chibrikov on 13.09.2014.
 */
public class UserProfile {
    private String login;
    private String password;
    private String email;




    public UserProfile(String loginParam, String passwordParam, String emailParam) {
        this.login = loginParam;
        this.password = passwordParam;
        this.email = emailParam;
    }


    public String getPassword() {
        return password;
    }

    public String getLogin() {return login;}

    public String getEmail() {return email;}




}
