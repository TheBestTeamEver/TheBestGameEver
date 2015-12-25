package frontend;

import base.GameMechanics;
import base.GameUser;
import base.WebSocketService;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;


@SuppressWarnings("unchecked")
@WebSocket
public class GameWebSocket {
    public static final int RANGE = 500;
    private String myName;
    private Session session;
    private GameMechanics gameMechanics;
    private WebSocketService webSocketService;
    private static int x = 0;
    private static int y = 0;

    public GameWebSocket(String myNameParam, GameMechanics gameMechanicsParam, WebSocketService webSocketServiceParam) {
        this.myName = myNameParam;
        this.gameMechanics = gameMechanicsParam;
        this.webSocketService = webSocketServiceParam;
    }

    public String getMyName() {
        return myName;
    }

    public void startGame(GameUser user) {
        try {
            JSONObject jsonStart = new JSONObject();
            jsonStart.put("status", "start");
            jsonStart.put("enemyName", user.getEnemyName());

            session.getRemote().sendString(jsonStart.toJSONString());
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    public void gameOver(boolean win) {
        try {
            JSONObject jsonStart = new JSONObject();
            jsonStart.put("status", "finish");
            jsonStart.put("win", win);
            session.getRemote().sendString(jsonStart.toJSONString());
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    @SuppressWarnings("unused")
    @OnWebSocketMessage
    public void onMessage(String data) {
        String sena = "";
        System.out.println(data);
        try {
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(data);
            JSONObject jsonObj = (JSONObject) obj;
            sena = (String) jsonObj.get("el");
        } catch (Exception exc) {

        }
        x = (int) (Math.random() * RANGE);
        y = (int) (Math.random() * RANGE);


        gameMechanics.incrementScore(myName, sena);
    }

    @SuppressWarnings("unused")
    @OnWebSocketConnect
    public void onOpen(Session sessionParam) {
        setSession(sessionParam);
        webSocketService.addUser(this);
        gameMechanics.addUser(myName);
    }

    public void setMyScore(GameUser user, String cena) {
        JSONObject jsonStart = new JSONObject();
        jsonStart.put("status", "increment");
        jsonStart.put("name", myName);
        jsonStart.put("score", user.getMyScore());
        jsonStart.put("x", x);
        jsonStart.put("y", y);
        jsonStart.put("el", cena);
        System.out.println(jsonStart.toJSONString());
        try {
            session.getRemote().sendString(jsonStart.toJSONString());
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    public void setEnemyScore(GameUser user, String cena) {
        JSONObject jsonStart = new JSONObject();
        jsonStart.put("status", "increment");
        jsonStart.put("name", user.getEnemyName());
        jsonStart.put("score", user.getEnemyScore());
        jsonStart.put("x", x);
        jsonStart.put("y", y);
        jsonStart.put("el", cena);
        System.out.println(jsonStart.toJSONString());
        try {
            session.getRemote().sendString(jsonStart.toJSONString());
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session sessionParam) {
        this.session = sessionParam;
    }

    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {

    }
}
