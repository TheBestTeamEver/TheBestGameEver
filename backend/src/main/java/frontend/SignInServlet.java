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
 * @author v.chibrikov
 */
public class SignInServlet extends HttpServlet {
    private AccountService accountService;
    private UserIdGenerator userIdGenerator;

    public SignInServlet(AccountService accountService, UserIdGenerator userIdGenerator) {
        this.accountService = accountService;
        this.userIdGenerator = userIdGenerator;
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println(PageGenerator.getPage("auth.html", null));
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String password = request.getParameter("password");

        response.setStatus(HttpServletResponse.SC_OK);

        Map<String, Object> pageVariables = new HashMap<>();

        UserProfile profile = accountService.getUser(name);
        if (profile != null && profile.getPassword().equals(password)) {
            HttpSession session = request.getSession();
            Long userId = (Long) session.getAttribute("userId");

            if (userId == null) {
                userId = userIdGenerator.getAndIncrement();
                session.setAttribute("userId", userId);
            }
            accountService.addSessions(userId.toString(), profile);

            pageVariables.put("loginStatus", "Login passed. " + "Session id:" + userId);
        } else {
            pageVariables.put("loginStatus", "Wrong login/password");
        }

        response.getWriter().println(PageGenerator.getPage("authstatus.html", pageVariables));
    }
}
