package com.grupo11.movies.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Movies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_movies;

    private String nombre;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private Integer anyo;
    private String calificacion;
    private String genero;
    private Integer estrellas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_director")
    private Directores director;
}
