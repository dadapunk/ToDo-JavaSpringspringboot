package com.dadalab.todojavaspring;

import com.dadalab.todojavaspring.models.Address;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.models.User;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import com.dadalab.todojavaspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class ToDoJavaSpringApplication {


    public static void main(String[] args) {

        SpringApplication.run(ToDoJavaSpringApplication.class, args);
    }
    @Bean
    public CommandLineRunner createUserInitialData(UserRepository userRepository) {
        return (args) -> {
            // Create some users with test data
            User user1 = new User();
            user1.setName("Wendy");
            user1.setUsername("wendy_cat");
            user1.setPassword("password1");

            Address address1 = new Address();
            address1.setStreet("Calle de los gatos 7");
            address1.setCity("Ciudad Gato");
            address1.setCountry("Gatolandia");

            user1.setAddress(address1);
            userRepository.save(user1);

            User user2 = new User();
            user2.setName("Irene");
            user2.setUsername("irene_love");
            user2.setPassword("password2");

            Address address2 = new Address();
            address2.setStreet("Calle de los traductores 7");
            address2.setCity("Ciudad Traductora");
            address2.setCountry("Traductolandia");

            user2.setAddress(address2);
            userRepository.save(user2);
        };
    }
    @Bean
    public CommandLineRunner createTodosInitialData(TodoRepository todoRepository, UserRepository userRepository) {
        return (args) -> {
            // Get some users from the database
            User user1 = userRepository.findByUsername("wendy_cat");
            User user2 = userRepository.findByUsername("irene_love");

            // Create some todos with test data
            Todo todo1 = new Todo();
            todo1.setTitle("Jugar con la bola");
            todo1.setCompleted(false);
            todo1.setUser(user1);
            todoRepository.save(todo1);

            Todo todo2 = new Todo();
            todo2.setTitle("Rascar el poste del rascador");
            todo2.setCompleted(false);
            todo2.setUser(user1);
            todoRepository.save(todo2);

            Todo todo3 = new Todo();
            todo3.setTitle("Salir al balcon");
            todo3.setCompleted(false);
            todo3.setUser(user1);
            todoRepository.save(todo3);

            Todo todo4 = new Todo();
            todo4.setTitle("Rascar la alfombra");
            todo4.setCompleted(false);
            todo4.setUser(user1);
            todoRepository.save(todo4);

            Todo todo5 = new Todo();
            todo5.setTitle("Pedir comida a Sebastian");
            todo5.setCompleted(false);
            todo5.setUser(user1);
            todoRepository.save(todo5);

            Todo todo6 = new Todo();
            todo6.setTitle("Tomar agua");
            todo6.setCompleted(false);
            todo6.setUser(user1);
            todoRepository.save(todo6);

            Todo todo7 = new Todo();
            todo7.setTitle("Traducir del aleman");
            todo7.setCompleted(false);
            todo7.setUser(user2);
            todoRepository.save(todo7);

            Todo todo8 = new Todo();
            todo8.setTitle("Revisar una traduccion");
            todo8.setCompleted(false);
            todo8.setUser(user2);
            todoRepository.save(todo8);

            Todo todo9 = new Todo();
            todo9.setTitle("Redactar un texto");
            todo9.setCompleted(false);
            todo9.setUser(user2);
            todoRepository.save(todo9);

            Todo todo10 = new Todo();
            todo10.setTitle("Investigar sobre un tema especifico");
            todo10.setCompleted(false);
            todo10.setUser(user2);
            todoRepository.save(todo10);

            Todo todo11 = new Todo();
            todo11.setTitle("Hacer correcciones ortograficas");
            todo11.setCompleted(false);
            todo11.setUser(user2);
            todoRepository.save(todo11);

            Todo todo12 = new Todo();
            todo12.setTitle("Traducir un libro");
            todo12.setCompleted(false);
            todo12.setUser(user2);
            todoRepository.save(todo12);
        };
    }



}
