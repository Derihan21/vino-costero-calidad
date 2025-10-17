package com.costero.vc.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tipo_uva")
public class TipoUva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false)
    private String tipo; // blanca/tinta

    @Column(name = "tiempo_maduracion", nullable = false)
    private Integer tiempoMaduracion; // días aprox

    @Column(columnDefinition = "text")
    private String caracteristicas;

    // ... getters y setters ...

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public Integer getTiempoMaduracion() { return tiempoMaduracion; }
    public void setTiempoMaduracion(Integer tiempoMaduracion) { this.tiempoMaduracion = tiempoMaduracion; }
    public String getCaracteristicas() { return caracteristicas; }
    public void setCaracteristicas(String caracteristicas) { this.caracteristicas = caracteristicas; }
}
