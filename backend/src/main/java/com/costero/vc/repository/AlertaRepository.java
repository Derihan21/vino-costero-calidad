package com.costero.vc.repository;

import com.costero.vc.entity.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    List<Alerta> findTop100ByOrderByFechaDesc();
}
