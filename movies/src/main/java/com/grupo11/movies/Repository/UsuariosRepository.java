package com.grupo11.movies.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.grupo11.movies.Model.Usuarios;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {

}

