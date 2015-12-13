package frontend;

import base.AccountService;
import main.UserProfile;
import org.json.JSONObject;
import templater.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by v.chibrikov on 13.09.2014.
 */
public class SignUpServlet extends HttpServlet {
    private AccountService accountService;


    public SignUpServlet(AccountService accountServiceParam) {

        this.accountService = accountServiceParam;
    }
    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        assert request != null;

        StringBuilder jb = new StringBuilder();
        String line = null;

            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);

        JSONObject jsonRequest = new JSONObject(jb.toString()); //Запрос в JSON
        JSONObject jsonResponse = new JSONObject();

        String name = jsonRequest.get("name").toString();
        String password = jsonRequest.get("password").toString();
        String email = jsonRequest.get("email").toString();

        UserProfile userProfile =
                new UserProfile(name, password, email);


        assert accountService != null;
        //noinspection ConstantConditions
        if (accountService.addUser(name, userProfile)) {
            HttpSession session = request.getSession();
            accountService.addSessions(session.getId(), userProfile);
            jsonResponse.put("status", "OK");
        } else {
            jsonResponse.put("status", "User already exist");
        }

        response.getWriter().println(jsonResponse);
        response.setStatus(HttpServletResponse.SC_OK);
    }


}
