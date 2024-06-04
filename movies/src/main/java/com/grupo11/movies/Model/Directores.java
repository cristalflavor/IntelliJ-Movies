package com.grupo11.movies.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "directores")
@Getter
@Setter
@NoArgsConstructor
public class Directores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Director;

    private String apellido;
    private String nombre;
    private Integer edad;
    private String nacionalidad;

}
