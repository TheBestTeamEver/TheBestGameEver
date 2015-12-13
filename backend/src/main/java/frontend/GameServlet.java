package frontend;

import base.AccountService;
import base.GameMechanics;
import main.UserProfile;
import utils.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author v.chibrikov
 */
public class GameServlet extends HttpServlet {

    @SuppressWarnings("FieldCanBeLocal")
    private GameMechanics gameMechanics;
    private AccountService accountService;

    public GameServlet(GameMechanics gameMechanicsParam, AccountService accountServiceParam) {
        this.gameMechanics = gameMechanicsParam;
        this.accountService = accountServiceParam;
    }

    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        Map<String, Object> pageVariables = new HashMap<>();
//        String name = request.getParameter("name");
//        String password = request.getParameter("password");
//        String email = request.getParameter("email");
//        String safeName = name == null ? "NoName" : name;

        UserProfile userProfile = accountService.getSessions(request.getSession().getId());
        String safeName = userProfile.getLogin();
//        accountService.addSessions(request.getSession().getId(), new UserProfile(name, password, email));
        pageVariables.put("myName", safeName);

        response.getWriter().println(PageGenerator.getPage("game.html", pageVariables));

        response.setContentType("text/html;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {

        Map<String, Object> pageVariables = new HashMap<>();
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String email = request.getParameter("email");
        String safeName = name == null ? "NoName" : name;
        accountService.addSessions(request.getSession().getId(), new UserProfile(name, password, email));
        pageVariables.put("myName", safeName);

        response.getWriter().println(PageGenerator.getPage("game.html", pageVariables));

        response.setContentType("text/html;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
