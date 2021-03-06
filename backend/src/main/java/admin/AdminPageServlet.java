package admin;

import main.TimeHelper;

import base.AccountService;
import templater.PageGenerator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class AdminPageServlet extends HttpServlet {
    private AccountService accountService;

    public AdminPageServlet(AccountService accountServiceParam) {
        this.accountService = accountServiceParam;
    }

    public static final String ADMIN_PAGE_URL = "/admin";


    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
        assert response != null;
        assert request != null;

        response.setContentType("text/html;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        Map<String, Object> pageVariables = new HashMap<>();
        String timeString = request.getParameter("shutdown");
        if (timeString != null) {
            int timeMS = Integer.valueOf(timeString);
            System.out.print("Server will be down after: " + timeMS + " ms");
            TimeHelper.sleep(timeMS);
            System.out.print("\nShutdown");
            System.exit(0);
        }
        pageVariables.put("signedIn", accountService.getSignedInNumber());
        pageVariables.put("registered", accountService.getRegisteredNumber());
        response.getWriter().println(PageGenerator.getPage("admin.html", pageVariables));
    }
}