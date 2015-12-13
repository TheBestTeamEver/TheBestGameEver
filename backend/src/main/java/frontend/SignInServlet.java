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
 * @author v.chibrikov
 */
public class SignInServlet extends HttpServlet {
    public static final String PAGE_URL = "/signin";
    private AccountService accountService;


    public SignInServlet(AccountService accountServiceParam) {
        this.accountService = accountServiceParam;

    }

    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        assert request != null;
        assert response != null;

        StringBuilder jb = new StringBuilder();
        String line = null;

            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);

        JSONObject jsonRequest = new JSONObject(jb.toString()); //Запрос в JSON
        JSONObject jsonResponse = new JSONObject();


        String name = jsonRequest.get("name").toString();
        String password = jsonRequest.get("password").toString();

        response.setStatus(HttpServletResponse.SC_OK);

        assert accountService != null;
        UserProfile profile = accountService.getUser(name);
        //noinspection ConstantConditions
        if (profile != null && profile.getPassword().equals(password)) {
            HttpSession session = request.getSession();
            accountService.addSessions(session.getId(), profile);
            jsonResponse.put("status", "OK");
        } else {
            jsonResponse.put("status", "wrong login/password");
        }

        //noinspection ConstantConditions,resource
        response.getWriter().println(jsonResponse);
    }
}
