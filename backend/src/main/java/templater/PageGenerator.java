package templater;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.jetbrains.annotations.Nullable;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;

/**
 * @author v.chibrikov
 */
public class PageGenerator {
    private static final String HTML_DIR = "server_tml";
    private static final Configuration CONFIG = new Configuration();


    @SuppressWarnings("ObjectToString")
    public static String getPage(String filename, @Nullable Map<String, Object> data) {
        Writer stream = new StringWriter();
        try {
            assert CONFIG != null;
            Template template = CONFIG.getTemplate(HTML_DIR + File.separator + filename);
            assert template != null;
            template.process(data, stream);
        } catch (IOException | TemplateException e) {
            e.printStackTrace();
        }
        return stream.toString();
    }
}
