package com.costero.vc.controller;

import com.costero.vc.entity.EstadoSanitario;
import com.costero.vc.entity.Tratamiento;
import com.costero.vc.entity.Alerta;
import com.costero.vc.repository.EstadoSanitarioRepository;
import com.costero.vc.repository.TratamientoRepository;
import com.costero.vc.repository.AlertaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/estados-sanitarios")
public class EstadoSanitarioController {
    private final EstadoSanitarioRepository repo;
    private final TratamientoRepository tratamientoRepo;
    private final AlertaRepository alertaRepo;

    public EstadoSanitarioController(EstadoSanitarioRepository repo, TratamientoRepository tratamientoRepo, AlertaRepository alertaRepo) {
        this.repo = repo;
        this.tratamientoRepo = tratamientoRepo;
        this.alertaRepo = alertaRepo;
    }

    @GetMapping
    public List<EstadoSanitario> list(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<EstadoSanitario> get(@PathVariable("id") Long id){ return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }

    @GetMapping("/parcela/{parcela}")
    public List<EstadoSanitario> historialPorParcela(@PathVariable("parcela") String parcela){ return repo.findByParcelaOrderByFechaInspeccionDesc(parcela); }

    @PostMapping
    public ResponseEntity<EstadoSanitario> create(@RequestBody EstadoSanitario e){ EstadoSanitario saved = repo.save(e); return ResponseEntity.created(URI.create("/api/estados-sanitarios/"+saved.getId())).body(saved); }

    @PutMapping("/{id}")
    public ResponseEntity<EstadoSanitario> update(@PathVariable("id") Long id, @RequestBody EstadoSanitario e){ e.setId(id); return ResponseEntity.ok(repo.save(e)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){ repo.deleteById(id); return ResponseEntity.noContent().build(); }

    // agregar un tratamiento a un estado sanitario existente
    @PostMapping("/{id}/tratamientos")
    public ResponseEntity<Tratamiento> addTratamiento(@PathVariable("id") Long id, @RequestBody Tratamiento t){
        return repo.findById(id).map(es -> {
            t.setEstadoSanitario(es);
            Tratamiento saved = tratamientoRepo.save(t);
            // asegurar que la lista de tratamientos esté inicializada
            if(es.getTratamientos()==null) es.setTratamientos(new java.util.ArrayList<>());
            es.getTratamientos().add(saved);
            repo.save(es);
            return ResponseEntity.created(URI.create("/api/estados-sanitarios/"+id+"/tratamientos/"+saved.getId())).body(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    // listar alertas recientes
    @GetMapping("/alertas")
    public java.util.List<Alerta> listarAlertas(){
        return alertaRepo.findTop100ByOrderByFechaDesc();
    }

}
