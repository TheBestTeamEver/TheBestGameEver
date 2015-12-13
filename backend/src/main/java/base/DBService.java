package base;

import base.dataSets.UserDataSet;
import org.hibernate.exception.ConstraintViolationException;

import java.util.List;

/**
 * @author v.chibrikov
 */
public interface DBService {
    String getLocalStatus();

    void save(UserDataSet dataSet) throws ConstraintViolationException;

    UserDataSet read(long id);

    UserDataSet readByName(String name);

    List<UserDataSet> readAll();

    void shutdown();
}
