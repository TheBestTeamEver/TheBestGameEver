package main;

import admin.AdminPageServlet;
import frontend.ExitServlet;
import frontend.SignInServlet;
import frontend.SignUpServlet;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import javax.servlet.Servlet;

/**
 * @author v.chibrikov
 */
public class Main {
    @SuppressWarnings("OverlyBroadThrowsClause")
    public static void main(String[] args) throws Exception {
        //noinspection ConstantConditions
        if (args.length != 1) {
            System.out.append("Use port as the first argument");
            System.exit(1);
        }

        String portString = args[0];
        //noinspection ConstantConditions
        int port = Integer.valueOf(portString);
        //noinspection ConstantConditions
        System.out.println("Starting at port: " + portString + '\n');

        AccountService accountService = new AccountService();


        Servlet signin = new SignInServlet(accountService);
        Servlet signUp = new SignUpServlet(accountService);
        Servlet exit   = new ExitServlet(accountService);
        Servlet admin  = new AdminPageServlet(accountService);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.addServlet(new ServletHolder(signin), "/api/v1/auth/signin");   //Войти
        context.addServlet(new ServletHolder(signUp), "/api/v1/auth/signup");   //Зарегистрироваться
        context.addServlet(new ServletHolder(exit),   "/api/v1/auth/logout");   //Выйти
        context.addServlet(new ServletHolder(admin), AdminPageServlet.ADMIN_PAGE_URL);

        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setResourceBase("public_html");

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[]{resource_handler, context});

        Server server = new Server(port);
        server.setHandler(handlers);

        server.start();
        server.join();
    }
}