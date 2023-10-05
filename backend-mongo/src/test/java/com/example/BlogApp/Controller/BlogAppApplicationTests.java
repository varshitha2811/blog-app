package com.example.BlogApp.Controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BlogAppApplicationTests {

	@Test
	void contextLoads() {
	}

    @Test
    public void main() {
        boolean noExceptionThrown = true;
        try {
            BlogAppApplication.main(new String[] {});
        } catch (Exception e) {
            noExceptionThrown = false;
        }
        assertTrue(noExceptionThrown);
}
}
