package uniasselvi.ListaCompras;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Optional;


public class ListDatabaseBuilder {
    public ListDatabaseBuilder() {

    }

    public static Connection getDatasource() throws NamingException, SQLException {

        return DriverManager.getConnection("jdbc:mysql://localhost:3306/uniasselvi", "User", "1234");
    }
}
