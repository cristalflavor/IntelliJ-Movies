package com.grupo11.movies.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.grupo11.movies.Repository.UsuariosRepository;
import com.grupo11.movies.Model.Usuarios;

@Controller
@RequestMapping("/pages")
public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @PostMapping("/registrarse")
    public String registrarNuevoUsuario(@ModelAttribute Usuarios usuario) {
        System.out.println("NO APARECE ESTO POR TANTO EL ENDPOINT NO ESTÁ FUNCIONANDO");
        usuariosRepository.save(usuario);
        return "redirect:/index.html";
    }
}

