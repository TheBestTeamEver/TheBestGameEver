package frontend;

import base.AccountService;
import org.json.JSONObject;
import templater.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by pavel on 20.09.15.
 */
public class ExitServlet extends HttpServlet {
    private AccountService accountService;

    public ExitServlet(AccountService accountServiceParam) {
        this.accountService = accountServiceParam;
    }


    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
    }


    @Override
    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException, IOException {

        assert request != null;
        assert accountService != null;
        HttpSession session = request.getSession();
        assert session != null;
        accountService.removeSession(session.getId());
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("status", "OK");
    }
}
