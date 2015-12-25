package base;

/**
 * @author v.chibrikov
 */
public interface GameMechanics {

    public void addUser(String user);

    public void incrementScore(String userName, String cena);

    public void run();
}
