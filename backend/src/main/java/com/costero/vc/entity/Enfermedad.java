package com.costero.vc.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "enfermedad")
public class Enfermedad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(columnDefinition = "text")
    private String sintomas;

    @Column(columnDefinition = "text")
    private String agenteCausante;

    @Column(columnDefinition = "text")
    private String tratamientoRecomendado;

    @Column(nullable = false)
    private String nivelRiesgo; // bajo, medio, alto, crítico

    private String fotoPath; // ruta a imagen almacenada

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getSintomas() { return sintomas; }
    public void setSintomas(String sintomas) { this.sintomas = sintomas; }
    public String getAgenteCausante() { return agenteCausante; }
    public void setAgenteCausante(String agenteCausante) { this.agenteCausante = agenteCausante; }
    public String getTratamientoRecomendado() { return tratamientoRecomendado; }
    public void setTratamientoRecomendado(String tratamientoRecomendado) { this.tratamientoRecomendado = tratamientoRecomendado; }
    public String getNivelRiesgo() { return nivelRiesgo; }
    public void setNivelRiesgo(String nivelRiesgo) { this.nivelRiesgo = nivelRiesgo; }
    public String getFotoPath() { return fotoPath; }
    public void setFotoPath(String fotoPath) { this.fotoPath = fotoPath; }
}
