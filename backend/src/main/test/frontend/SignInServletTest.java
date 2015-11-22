package frontend;

import base.AccountService;
import main.UserProfile;
import org.jetbrains.annotations.NotNull;
import org.junit.Test;
import templater.PageGenerator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

/**
 * Created by supergood on 15.11.15.
 */
public class SignInServletTest {

    private AccountService accountService = mock(AccountService.class);
    @NotNull
    private final UserProfile testUser = new UserProfile("testLogin", "testPassword", "test@email");

    private HttpServletResponse getMockedResponse(StringWriter stringWriter) throws IOException {
        HttpServletResponse response = mock(HttpServletResponse.class);

        final PrintWriter writer = new PrintWriter(stringWriter);

        when(response.getWriter()).thenReturn(writer);

        return response;
    }

    private HttpServletRequest getMockedRequest(String url) {
        HttpSession httpSession = mock(HttpSession.class);
        HttpServletRequest request = mock(HttpServletRequest.class);

        when(request.getSession()).thenReturn(httpSession);
        when(request.getPathInfo()).thenReturn(url);

        return request;
    }

    @Test
    public void testDoGet() throws Exception {
        final StringWriter stringWriter = new StringWriter();
        HttpServletResponse response = getMockedResponse(stringWriter);
        HttpServletRequest request = getMockedRequest(SignInServlet.PAGE_URL);
//        when(request.getParameter("remove")).thenReturn("");

        SignInServlet signInServlet = new SignInServlet(accountService);
//        SignInServlet spy = spy(homePage);


        signInServlet.doGet(request, response);

        assertEquals(PageGenerator.getPage("auth.html", null) + "\n", stringWriter.toString());
////        verify(accountService, times(1)).doGet();
////        HttpSession session = request.getSession();
////        when(accountService.getSessions()).thenReturn(testUser);
//        accountService.addSessions(request.getSession().getId(), testUser);
//        signInServlet.doGet(request, response);
//        assertEquals(PageGenerator.getPage("SIGNEDIN.html", null) + "\n", stringWriter.toString());

    }

    @Test
    public void testDoPost() throws Exception {

    }
}