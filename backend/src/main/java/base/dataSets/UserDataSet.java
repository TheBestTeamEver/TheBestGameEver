package base.dataSets;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class UserDataSet implements Serializable { // Serializable Important to Hibernate!
    private static final long serialVersionUID = -8706689714326132798L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private  String  email;

    @Column(name = "password")
    private  String  password;

    //Important to Hibernate!
    public UserDataSet() {
    }

    public UserDataSet(long idParam, String nameParam, String emailParam) {
        this.id = idParam;
        this.name = nameParam;
        this.email = emailParam;
    }

    @SuppressWarnings("CallToSimpleSetterFromWithinClass")
    public UserDataSet(String nameParam, String emailParam, String passwordParam) {
        this.setId(-1);
        this.name = name;
        this.email = email;
        this.password = password;
    }


    public  void setPass(String passwordParam) {this.password = passwordParam; }
    public  String getEmail() {return  email;}
    public String getPassword() {return  password;}

    public void setEmail(String emailParam) {this.email = emailParam;}

    public String getName() {
        return name;
    }

    public void setName(String nameParam) {
        this.name = nameParam;
    }

    public long getId() {
        return id;
    }

    public void setId(long idParam) {
        this.id = idParam;
    }

    @Override
    public String toString() {
        return "UserDataSet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

