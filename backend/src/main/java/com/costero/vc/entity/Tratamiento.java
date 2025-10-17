package com.costero.vc.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tratamiento")
public class Tratamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private String producto;

    private String observaciones;

    // relacion inversa opcional
    @ManyToOne
    private EstadoSanitario estadoSanitario;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public String getProducto() { return producto; }
    public void setProducto(String producto) { this.producto = producto; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public EstadoSanitario getEstadoSanitario() { return estadoSanitario; }
    public void setEstadoSanitario(EstadoSanitario estadoSanitario) { this.estadoSanitario = estadoSanitario; }
}
