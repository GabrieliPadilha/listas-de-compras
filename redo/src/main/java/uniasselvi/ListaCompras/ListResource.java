package uniasselvi.ListaCompras;

import javax.naming.NamingException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Path("/list")
public class ListResource {
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getList() throws SQLException, NamingException {
        Connection connection = ListDatabaseBuilder.getDatasource();

        try {

            PreparedStatement stmt = connection.prepareStatement("SELECT Nome_Item FROM lista");
            ResultSet results = stmt.executeQuery();

            ArrayList<String> returnValue = new ArrayList<>();
            while (results.next()) {
                returnValue.add(results.getString("Nome_Item"));
            }

            return returnValue;
        } finally {
            connection.close();
        }
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> updateList(List<String> items) throws SQLException, NamingException {
        Connection connection = ListDatabaseBuilder.getDatasource();

        try {
            PreparedStatement insertStatement = connection
                    .prepareStatement("INSERT INTO lista (Nome_Item) VALUES (?)");

            for (String item : items) {
                insertStatement.setString(1, item);
                insertStatement.execute();
            }

            return getList();
        } finally {
            connection.close();
        }
    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> search(@QueryParam("query") String query) throws SQLException, NamingException {

        Connection connection = ListDatabaseBuilder.getDatasource();

        try {
            PreparedStatement search = connection
                    .prepareStatement("select Nome_Item from lista where Nome_Item LIKE ?");
            search.setString(1, String.format("%%%s%%", query));
            ResultSet results = search.executeQuery();

            ArrayList<String> returnValue = new ArrayList<>();
            while (results.next()) {
                returnValue.add(results.getString("Nome_Item"));
            }

            return returnValue;
        } catch (SQLException e) {
            e.printStackTrace();
            return Collections.emptyList();
        } finally {
            connection.close();
        }
    }
}




