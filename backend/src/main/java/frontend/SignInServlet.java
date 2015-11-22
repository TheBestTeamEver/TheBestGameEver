package frontend;

import base.AccountService;
import main.UserProfile;
import templater.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author v.chibrikov
 */
public class SignInServlet extends HttpServlet {
    public static final String PAGE_URL = "/api/v1/auth/signin";
    private AccountService accountService;


    public SignInServlet(AccountService accountServiceParam) {
        this.accountService = accountServiceParam;

    }

    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        assert response != null;
        //noinspection ConstantConditions,resource
        HttpSession session = request.getSession();
        if (accountService.getSessions(session.getId()) != null) {
            response.getWriter().println(PageGenerator.getPage("SIGNEDIN.html", null));
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            response.getWriter().println(PageGenerator.getPage("auth.html", null));
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }

    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        assert request != null;
        assert response != null;

        String name = request.getParameter("name");
        String password = request.getParameter("password");

        response.setStatus(HttpServletResponse.SC_OK);

        Map<String, Object> pageVariables = new HashMap<>();

        assert accountService != null;
        UserProfile profile = accountService.getUser(name);
        //noinspection ConstantConditions
        if (profile != null && profile.getPassword().equals(password)) {
            HttpSession session = request.getSession();
            accountService.addSessions(session.getId(), profile);
            pageVariables.put("loginStatus", "Login passed. " + "Session id:" + session.getId());
        } else {
            pageVariables.put("loginStatus", "Wrong login/password");
        }

        //noinspection ConstantConditions,resource
        response.getWriter().println(PageGenerator.getPage("authstatus.html", pageVariables));
    }
}
