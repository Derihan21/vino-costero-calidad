package com.costero.vc.controller;

import com.costero.vc.entity.Embarque;
import com.costero.vc.entity.Comprador;
import com.costero.vc.repository.EmbarqueRepository;
import com.costero.vc.repository.CompradorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/embarques")
public class EmbarqueController {
    private final EmbarqueRepository repo;
    private final CompradorRepository compradorRepo;

    public EmbarqueController(EmbarqueRepository repo, CompradorRepository compradorRepo) { this.repo = repo; this.compradorRepo = compradorRepo; }

    @GetMapping
    public List<Embarque> list(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Embarque> get(@PathVariable("id") Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Embarque> create(@RequestBody Embarque e){
        Embarque saved = repo.save(e);
        return ResponseEntity.created(URI.create("/api/embarques/"+saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Embarque> update(@PathVariable("id") Long id, @RequestBody Embarque e){ e.setId(id); return ResponseEntity.ok(repo.save(e)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){ repo.deleteById(id); return ResponseEntity.noContent().build(); }

    // listar embarques por comprador
    @GetMapping("/por-comprador/{compradorId}")
    public java.util.List<Embarque> porComprador(@PathVariable("compradorId") Long compradorId){
        return repo.findByCompradores_Id(compradorId);
    }

    // adjuntar compradores a un embarque
    @PostMapping("/{id}/compradores")
    public ResponseEntity<Embarque> addCompradores(@PathVariable("id") Long id, @RequestBody java.util.List<Long> compradorIds){
        return repo.findById(id).map(e->{
            java.util.List<Comprador> compradores = compradorRepo.findAllById(compradorIds);
            e.setCompradores(compradores);
            Embarque saved = repo.save(e);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    // búsqueda rápida con paginación y filtro por texto (destino/transportista/estado)
    @GetMapping("/search")
    public org.springframework.data.domain.Page<Embarque> search(@RequestParam(value="q", required=false) String q,
                                                                   @RequestParam(value="page", defaultValue="0") int page,
                                                                   @RequestParam(value="size", defaultValue="10") int size){
        org.springframework.data.domain.Pageable p = org.springframework.data.domain.PageRequest.of(page, size);
        if(q==null || q.trim().isEmpty()){
            return repo.findAll(p);
        }
        String term = q.trim();
        return repo.findByDestinoContainsIgnoreCaseOrTransportistaContainsIgnoreCaseOrEstadoContainsIgnoreCase(term, term, term, p);
    }
}
