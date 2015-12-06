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
 * Created by pavel on 26.11.15.
 */
public class CheckServlet extends HttpServlet {


    private AccountService accountService;


    public CheckServlet(AccountService accountServiceParam) {
        this.accountService = accountServiceParam;

    }
    @Override
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        assert response != null;
        JSONObject jsonResponse = new JSONObject();
        //noinspection ConstantConditions,resource
        HttpSession session = request.getSession();
        if (accountService.getSessions(session.getId()) != null) {
           // response.getWriter().println(PageGenerator.getPage("SIGNEDIN.html", null));
            jsonResponse.put("status", "zaeptca");
            response.getWriter().println(jsonResponse);
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            //response.getWriter().println(PageGenerator.getPage("auth.html", null));
            jsonResponse.put("status", "pizdec");
            response.getWriter().println(jsonResponse);
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }
}
