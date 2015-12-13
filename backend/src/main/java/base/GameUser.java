package base;

/**
 * @author v.chibrikov
 */
public class GameUser {
    private final String myName;
    private String enemyName;
    private int myScore = 0;
    private int enemyScore = 0;

    public GameUser(String myNameParam) {
        this.myName = myNameParam;
    }

    public String getMyName() {
        return myName;
    }

    public String getEnemyName() {
        return enemyName;
    }

    public int getMyScore() {
        return myScore;
    }

    public int getEnemyScore() {
        return enemyScore;
    }

    public void incrementMyScore() {
        myScore++;
    }

    public void incrementEnemyScore() {
        enemyScore++;
    }

    public void setEnemyName(String enemyNameParam) {
        this.enemyName = enemyNameParam;
    }
}
