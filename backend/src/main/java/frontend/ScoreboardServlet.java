package frontend;

import org.json.simple.JSONArray;
import org.json.JSONObject;
import org.json.simple.JSONStreamAware;
import org.json.simple.JSONValue;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.*;

public class ScoreboardServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException, IOException {
//        JSONObject jsonStart = new JSONObject();
//        jsonStart.put("status", "increment");
//        response.getWriter().println(jsonResponse);
        class User implements JSONStreamAware {
            private int score;
            private String name;

            public User(String name, int score) {
                this.score = score;
                this.name = name;
            }

            @Override
            public void writeJSONString(Writer out) throws IOException {
                Map<String, String> player = new HashMap<>();
                player.put("name", name);
                player.put("score", String.valueOf(score));
                JSONValue.writeJSONString(player, out);
            }
        }

        JSONArray users = new JSONArray();
        users.add(new User("Pasho", 35));
        users.add(new User("Max", 29));
        users.add(new User("Alex", 28));
        users.add(new User("Stas", 26));
        users.add(new User("Dich", 25));
        users.add(new User("SHOMA", 23));
        users.add(new User("Tako", 22));
        users.add(new User("Luke", 18));
        users.add(new User("I'm your Daddy", 17));
        users.add(new User("ololo", 15));

        StringWriter out = new StringWriter();
        users.writeJSONString(out);
        System.out.println(out.toString());


        response.getWriter().println(out);
        response.setStatus(HttpServletResponse.SC_OK);
    }

}
