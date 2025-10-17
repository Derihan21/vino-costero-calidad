package com.costero.vc.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "embarque")
public class Embarque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaEnvio;
    private String transportista;
    private String destino;
    private String condicionesTransporte;
    private String estado; // preparando, en tránsito, entregado, con incidencias

    @ManyToMany
    private List<Comprador> compradores; // simplificado: compradores relacionados

    private String documentacion;

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getFechaEnvio() { return fechaEnvio; }
    public void setFechaEnvio(LocalDate fechaEnvio) { this.fechaEnvio = fechaEnvio; }
    public String getTransportista() { return transportista; }
    public void setTransportista(String transportista) { this.transportista = transportista; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public String getCondicionesTransporte() { return condicionesTransporte; }
    public void setCondicionesTransporte(String condicionesTransporte) { this.condicionesTransporte = condicionesTransporte; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public List<Comprador> getCompradores() { return compradores; }
    public void setCompradores(List<Comprador> compradores) { this.compradores = compradores; }
    public String getDocumentacion() { return documentacion; }
    public void setDocumentacion(String documentacion) { this.documentacion = documentacion; }
}
