package com.costero.vc.controller;

import com.costero.vc.entity.Enfermedad;
import com.costero.vc.repository.EnfermedadRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/enfermedades")
public class EnfermedadController {
    private final EnfermedadRepository repo;

    public EnfermedadController(EnfermedadRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Enfermedad> list(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Enfermedad> get(@PathVariable("id") Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Enfermedad> create(@RequestBody Enfermedad e){
        Enfermedad saved = repo.save(e);
        return ResponseEntity.created(URI.create("/api/enfermedades/"+saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enfermedad> update(@PathVariable("id") Long id, @RequestBody Enfermedad e){
        e.setId(id);
        return ResponseEntity.ok(repo.save(e));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){ repo.deleteById(id); return ResponseEntity.noContent().build(); }
}
