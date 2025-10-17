package com.costero.vc.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "estado_sanitario")
public class EstadoSanitario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String parcela;

    private LocalDate fechaInspeccion;

    private String estadoGeneral; // saludable, en observación, afectado, crítico

    @ManyToOne
    private Enfermedad enfermedadDetectada;

    @OneToMany(mappedBy = "estadoSanitario", cascade = CascadeType.ALL)
    private java.util.List<Tratamiento> tratamientos;

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getParcela() { return parcela; }
    public void setParcela(String parcela) { this.parcela = parcela; }
    public LocalDate getFechaInspeccion() { return fechaInspeccion; }
    public void setFechaInspeccion(LocalDate fechaInspeccion) { this.fechaInspeccion = fechaInspeccion; }
    public String getEstadoGeneral() { return estadoGeneral; }
    public void setEstadoGeneral(String estadoGeneral) { this.estadoGeneral = estadoGeneral; }
    public Enfermedad getEnfermedadDetectada() { return enfermedadDetectada; }
    public void setEnfermedadDetectada(Enfermedad enfermedadDetectada) { this.enfermedadDetectada = enfermedadDetectada; }
    public java.util.List<Tratamiento> getTratamientos() { return tratamientos; }
    public void setTratamientos(java.util.List<Tratamiento> tratamientos) { this.tratamientos = tratamientos; }
}
