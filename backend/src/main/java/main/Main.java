package main;

import admin.AdminPageServlet;
import base.AccountService;
import frontend.CheckServlet;
import frontend.ExitServlet;
import frontend.SignInServlet;
import frontend.SignUpServlet;
import frontend.CheckServlet;

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

    public static final int PORT = 8080;

    public static void main(String[] args) throws InterruptedException {

        if (args.length != 1) {
            System.out.append("Use port as the first argument");
            System.exit(1);
        }
        String portString = args[0];
        int port;

        try {
            port = Integer.valueOf(portString);
        } catch (NumberFormatException ex) {

            System.out.println("You have input not a number!!! Port 8080 will be used");
            port = PORT;
        }
        System.out.println("Starting at port: " + port + '\n');

        AccountService accountService = new AccountServiceImpl();


        Servlet signIn = new SignInServlet(accountService);
        Servlet signUp = new SignUpServlet(accountService);
        Servlet exit = new ExitServlet(accountService);
        Servlet admin = new AdminPageServlet(accountService);
        Servlet check = new CheckServlet(accountService);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.addServlet(new ServletHolder(signIn), SignInServlet.PAGE_URL);
        context.addServlet(new ServletHolder(signUp), "/signup");
        context.addServlet(new ServletHolder(exit), "/logout");
        context.addServlet(new ServletHolder(admin), AdminPageServlet.ADMIN_PAGE_URL);
        context.addServlet(new ServletHolder(check), "/check");


        ResourceHandler resource_handler = new ResourceHandler();
        resource_handler.setDirectoriesListed(true);
        resource_handler.setResourceBase("public_html");

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[]{resource_handler, context});

        Server server = new Server(port);
        server.setHandler(handlers);

        try {
            server.start();
        } catch (Exception ex) {
            System.out.append("Problem with start server.");
            System.exit(1);
        }

        server.join();


    }
}