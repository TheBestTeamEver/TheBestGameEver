package main;

import java.io.Serializable;
import java.io.StreamCorruptedException;

public class SerializationObject implements Serializable {
    private static final long serialVersionUID = -3895203507200457732L;
    private int defaultPort;
    private int gameTime;
    private int stepTime;

    public SerializationObject() {
        this.defaultPort = 8080;
        this.gameTime = 15000;
        this.stepTime = 100;
    }

    public SerializationObject(int defaultPort, int gameTime, int stepTime) {
        this.setDefaultPort(defaultPort);
        this.setGameTime(gameTime);
        this.setStepTime(stepTime);
    }

    public int getDefaultPort() {
        return defaultPort;
    }

    public void setDefaultPort(int defaultPort) {
        this.defaultPort = defaultPort;
    }

    public int getGameTime() {
        return gameTime;
    }

    public void setGameTime(int gameTime) {
        this.gameTime = gameTime;
    }

    public int getStepTime() {
        return stepTime;
    }

    public void setStepTime(int stepTime) {
        this.stepTime = stepTime;
    }

    @Override
    public String toString() {
        return "defaultPort: " + defaultPort + "\n" +
                "gameTime: " + gameTime + "\n" +
                "stepTime: " + stepTime;
    }
}
