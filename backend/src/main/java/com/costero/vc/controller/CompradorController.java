package com.costero.vc.controller;

import com.costero.vc.entity.Comprador;
import com.costero.vc.repository.CompradorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/compradores")
public class CompradorController {
    private final CompradorRepository repo;

    public CompradorController(CompradorRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Comprador> list(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Comprador> get(@PathVariable("id") Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Comprador> create(@RequestBody Comprador c){
        Comprador saved = repo.save(c);
        return ResponseEntity.created(URI.create("/api/compradores/"+saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comprador> update(@PathVariable("id") Long id, @RequestBody Comprador c){ c.setId(id); return ResponseEntity.ok(repo.save(c)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){ repo.deleteById(id); return ResponseEntity.noContent().build(); }
}
