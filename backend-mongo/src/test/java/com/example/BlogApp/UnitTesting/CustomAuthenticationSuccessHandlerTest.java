// package com.example.BlogApp;

// import org.junit.jupiter.api.Test;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.mock.web.MockHttpServletRequest;
// import org.springframework.mock.web.MockHttpServletResponse;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.GrantedAuthority;

// import com.example.BlogApp.config.SecurityConfig.CustomAuthenticationSuccessHandler;

// import jakarta.servlet.ServletException;

// import java.io.IOException;
// import java.util.ArrayList;
// import java.util.Collection;

// import static org.mockito.Mockito.*;

// public class CustomAuthenticationSuccessHandlerTest {

//     @Mock
//     private Authentication authentication;

  
//     @Test
//     void onAuthenticationSuccess_AdminRedirect() throws IOException, ServletException {
//         MockHttpServletRequest request = new MockHttpServletRequest();
//         MockHttpServletResponse response = new MockHttpServletResponse();

//         Authentication authentication = mock(Authentication.class);

//         GrantedAuthority adminAuthority = mock(GrantedAuthority.class);
//         when(adminAuthority.getAuthority()).thenReturn("ROLE_ADMIN");

//         Collection<GrantedAuthority> authorities = new ArrayList<>();
//         authorities.add(adminAuthority);

//         when(authentication.getAuthorities()).thenReturn(authorities);

//         CustomAuthenticationSuccessHandler successHandler = new CustomAuthenticationSuccessHandler();
//         successHandler.onAuthenticationSuccess(request, response, authentication);

//         verify(response).sendRedirect("/adminprofile");
//     }

//     @Test
//     void onAuthenticationSuccess_UserRedirect() throws IOException, ServletException {
//         MockHttpServletRequest request = new MockHttpServletRequest();
//         MockHttpServletResponse response = new MockHttpServletResponse();

//         Authentication authentication = mock(Authentication.class);

//         GrantedAuthority userAuthority = mock(GrantedAuthority.class);
//         when(userAuthority.getAuthority()).thenReturn("ROLE_USER");

//         Collection<GrantedAuthority> authorities = new ArrayList<>();
//         authorities.add(userAuthority);

//         when(authentication.getAuthorities()).thenReturn(authorities);

//         CustomAuthenticationSuccessHandler successHandler = new CustomAuthenticationSuccessHandler();
//         successHandler.onAuthenticationSuccess(request, response, authentication);

//         verify(response).sendRedirect("/profile");
//     }

// }