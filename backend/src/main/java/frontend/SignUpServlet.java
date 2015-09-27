package frontend;

import main.AccountService;
import main.UserIdGenerator;
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
    private UserIdGenerator userIdGenerator;

    public SignUpServlet(AccountService accountService, UserIdGenerator userIdGenerator) {
        this.accountService = accountService;
        this.userIdGenerator = userIdGenerator;
    }

    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        assert response != null;
        //noinspection ConstantConditions,resource
        response.getWriter().println(PageGenerator.getPage("registration.html", null));
        response.setStatus(HttpServletResponse.SC_OK);
    }


    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        assert request != null;
        String name     = request.getParameter("name");
        String password = request.getParameter("password");
        String email    = request.getParameter("email");

        @SuppressWarnings("ConstantConditions") UserProfile userProfile =
                new UserProfile(name,password,email);

        Map<String, Object> pageVariables = new HashMap<>();
        assert accountService != null;
        //noinspection ConstantConditions
        if (accountService.addUser(name, userProfile)) {
            HttpSession session = request.getSession();
            assert session != null;
            Long userId = (Long) session.getAttribute("userId");

            if (userId == null) {
                //noinspection ConstantConditions
                userId = userIdGenerator.getAndIncrement();
                session.setAttribute("userId", userId);
            }
            accountService.addSessions(userId.toString(), userProfile);
            pageVariables.put("signUpStatus", "New user created. " + "Session id:" + userId);
        } else {
            pageVariables.put("signUpStatus", "User with name: " + name + " already exists");
        }

        //noinspection ConstantConditions,resource
        response.getWriter().println(PageGenerator.getPage("signupstatus.html", pageVariables));
        response.setStatus(HttpServletResponse.SC_OK);
    }


}
