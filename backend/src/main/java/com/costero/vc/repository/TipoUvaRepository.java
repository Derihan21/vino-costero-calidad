package com.costero.vc.repository;

import com.costero.vc.entity.TipoUva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TipoUvaRepository extends JpaRepository<TipoUva, Long> {
    Optional<TipoUva> findByNombre(String nombre);
}
