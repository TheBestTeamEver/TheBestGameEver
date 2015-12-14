package frontend;

import base.AccountService;
import base.GameMechanics;
import base.WebSocketService;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;

/**
 * @author v.chibrikov
 */
public class GameWebSocketCreator implements WebSocketCreator {
    private AccountService accountService;
    private GameMechanics gameMechanics;
    private WebSocketService webSocketService;

    public GameWebSocketCreator(AccountService accountServiceParam,
                                GameMechanics gameMechanicsParam,
                                WebSocketService webSocketServiceParam) {
        this.accountService = accountServiceParam;
        this.gameMechanics = gameMechanicsParam;
        this.webSocketService = webSocketServiceParam;
    }

    @Override
    public Object createWebSocket(ServletUpgradeRequest req, ServletUpgradeResponse resp) {
        String sessionId = req.getHttpServletRequest().getSession().getId();
        System.out.println(sessionId);

        String name = accountService.getSessions(sessionId).getLogin();
        return new GameWebSocket(name, gameMechanics, webSocketService);
    }
}
