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
 * Created by v.chibrikov on 13.09.2014.
 */
public class SignUpServlet extends HttpServlet {
    private AccountService accountService;


    public SignUpServlet(AccountService accountServiceParam) {

        this.accountService = accountServiceParam;
    }

    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        assert response != null;
        HttpSession session = request.getSession();
        if (accountService.getSessions(session.getId()) != null) {
            response.getWriter().println(PageGenerator.getPage("SIGNEDIN.html", null));
            response.setStatus(HttpServletResponse.SC_OK);
        } else {

            response.getWriter().println(PageGenerator.getPage("registration.html", null));
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }


    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        assert request != null;
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String email = request.getParameter("email");

        UserProfile userProfile =
                new UserProfile(name, password, email);

        Map<String, Object> pageVariables = new HashMap<>();
        assert accountService != null;
        //noinspection ConstantConditions
        if (accountService.addUser(name, userProfile)) {
            pageVariables.put("signUpStatus", "New user created.");
        } else {
            pageVariables.put("signUpStatus", "User with name: " + name + " already exists");
        }

        response.getWriter().println(PageGenerator.getPage("signupstatus.html", pageVariables));
        response.setStatus(HttpServletResponse.SC_OK);
    }


}
