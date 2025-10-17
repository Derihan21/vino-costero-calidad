package com.costero.vc.controller;

import com.costero.vc.entity.TipoUva;
import com.costero.vc.service.TipoUvaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tipos-uva")
public class TipoUvaController {
    private final TipoUvaService service;

    public TipoUvaController(TipoUvaService service) { this.service = service; }

    @GetMapping
    public List<TipoUva> list() { return service.listAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<TipoUva> get(@PathVariable("id") Long id) {
        return service.get(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TipoUva> create(@RequestBody TipoUva t) {
        TipoUva saved = service.create(t);
        return ResponseEntity.created(URI.create("/api/tipos-uva/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoUva> update(@PathVariable("id") Long id, @RequestBody TipoUva t) {
        TipoUva updated = service.update(id, t);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
