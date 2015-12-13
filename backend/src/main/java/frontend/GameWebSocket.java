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


@SuppressWarnings({"StaticVariableNamingConvention", "unchecked", "OverlyBroadCatchBlock", "CallToSimpleSetterFromWithinClass"})
@WebSocket
public class GameWebSocket {
    public static final int INT = 500;
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

    public void gameOver(GameUser user, boolean win) {
        try {
            JSONObject jsonStart = new JSONObject();
            jsonStart.put("status", "finish");
            jsonStart.put("win", win);
            session.getRemote().sendString(jsonStart.toJSONString());
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    @OnWebSocketMessage
    public void onMessage(String data) {
        x = (int) (Math.random() * INT);
        y = (int) (Math.random() * INT);
        gameMechanics.incrementScore(myName);
    }

    @OnWebSocketConnect
    public void onOpen(Session sessionParam) {
        setSession(sessionParam);
        webSocketService.addUser(this);
        gameMechanics.addUser(myName);
    }

    public void setMyScore(GameUser user) {
        JSONObject jsonStart = new JSONObject();
        jsonStart.put("status", "increment");
        jsonStart.put("name", myName);
        jsonStart.put("score", user.getMyScore());
        jsonStart.put("x", x);
        jsonStart.put("y", y);
        try {
            session.getRemote().sendString(jsonStart.toJSONString());
        } catch (Exception e) {
            System.out.print(e.toString());
        }
    }

    public void setEnemyScore(GameUser user) {
        JSONObject jsonStart = new JSONObject();
        jsonStart.put("status", "increment");
        jsonStart.put("name", user.getEnemyName());
        jsonStart.put("score", user.getEnemyScore());
        jsonStart.put("x", x);
        jsonStart.put("y", y);
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
