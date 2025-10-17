package com.costero.vc.service;

import com.costero.vc.entity.TipoUva;
import com.costero.vc.repository.TipoUvaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoUvaService {
    private final TipoUvaRepository repo;

    public TipoUvaService(TipoUvaRepository repo) { this.repo = repo; }

    public List<TipoUva> listAll() { return repo.findAll(); }
    public Optional<TipoUva> get(Long id) { return repo.findById(id); }
    public TipoUva create(TipoUva t) { return repo.save(t); }
    public TipoUva update(Long id, TipoUva t) {
        t.setId(id);
        return repo.save(t);
    }
    public void delete(Long id) { repo.deleteById(id); }
}
