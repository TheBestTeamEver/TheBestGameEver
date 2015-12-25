package base;

import frontend.GameWebSocket;

/**
 * @author v.chibrikov
 */
public interface WebSocketService {

    void addUser(GameWebSocket user);

    void notifyMyNewScore(GameUser user, String cena);

    void notifyEnemyNewScore(GameUser user, String cena);

    void notifyStartGame(GameUser user);

    void notifyGameOver(GameUser user, boolean win);
}
