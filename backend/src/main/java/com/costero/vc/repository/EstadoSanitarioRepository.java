package com.costero.vc.repository;

import com.costero.vc.entity.EstadoSanitario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EstadoSanitarioRepository extends JpaRepository<EstadoSanitario, Long> {
    List<EstadoSanitario> findByParcelaOrderByFechaInspeccionDesc(String parcela);
}
