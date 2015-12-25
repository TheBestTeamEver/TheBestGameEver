package main;

import admin.AdminPageServlet;
import base.AccountService;
import base.GameMechanics;
import base.WebSocketService;
import frontend.*;
import frontend.CheckServlet;

import mechanics.GameMechanicsImpl;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import sax.ReadXMLFileSAX;

import javax.servlet.Servlet;

/**
 * @author v.chibrikov
 */

public class Main {

    public static void main(String[] args) throws Exception {

        SerializationObject serializationObject = (SerializationObject) ReadXMLFileSAX.readXML("settings.xml");
        if (serializationObject == null) {
            System.out.println("Данные из файла настроек не загружены.");
            System.exit(1);
        }

        int port;
        if (args.length != 1) {
            System.out.append("Будет использован порт из файла настроек проекта: ");
            System.out.append((char) serializationObject.getDefaultPort());
            port = serializationObject.getDefaultPort();
        } else {
            String portString = args[0];
            try {
                port = Integer.valueOf(portString);
            } catch (NumberFormatException ex) {
                System.out.println("Вы ввели не число. " +
                        "Будет использован порт из файла настроек проекта: ");
                System.out.append((char) serializationObject.getDefaultPort());
                port = serializationObject.getDefaultPort();
            }
        }

        System.out.println("Старт на порту: " + port + '\n');

        AccountService accountService = new AccountServiceImpl();
//         AccountService accountService = new AccountServiceDBImpl();

        Servlet signIn = new SignInServlet(accountService);
        Servlet signUp = new SignUpServlet(accountService);
        Servlet exit = new ExitServlet(accountService);
        Servlet admin = new AdminPageServlet(accountService);
        Servlet check = new CheckServlet(accountService);
        Servlet scoreboard = new ScoreboardServlet();

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.addServlet(new ServletHolder(signIn), SignInServlet.PAGE_URL);
        context.addServlet(new ServletHolder(signUp), "/signup");
        context.addServlet(new ServletHolder(exit), "/logout");
        context.addServlet(new ServletHolder(admin), AdminPageServlet.ADMIN_PAGE_URL);
        context.addServlet(new ServletHolder(check), "/check");
        context.addServlet(new ServletHolder(scoreboard), "/scoreboard1");

        int stepTime = serializationObject.getStepTime();
        int gameTime = serializationObject.getGameTime();

        WebSocketService webSocketService = new WebSocketServiceImpl();
        GameMechanics gameMechanics = new GameMechanicsImpl(webSocketService, stepTime, gameTime);
        context.addServlet(new ServletHolder(new WebSocketGameServlet(accountService, gameMechanics, webSocketService)), "/gameplay");

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

//        server.join();
//        server.start();

        //run GM in main thread
        gameMechanics.run();

    }
}