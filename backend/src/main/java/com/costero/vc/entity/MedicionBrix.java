package com.costero.vc.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "medicion_brix")
public class MedicionBrix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String parcela;

    private LocalDate fecha;

    private Double gradosBrix;

    @ManyToOne
    private TipoUva variedad;

    private String responsable;

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getParcela() { return parcela; }
    public void setParcela(String parcela) { this.parcela = parcela; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public Double getGradosBrix() { return gradosBrix; }
    public void setGradosBrix(Double gradosBrix) { this.gradosBrix = gradosBrix; }
    public TipoUva getVariedad() { return variedad; }
    public void setVariedad(TipoUva variedad) { this.variedad = variedad; }
    public String getResponsable() { return responsable; }
    public void setResponsable(String responsable) { this.responsable = responsable; }
}
