package com.costero.vc.repository;

import com.costero.vc.entity.MedicionBrix;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MedicionBrixRepository extends JpaRepository<MedicionBrix, Long> {
        List<MedicionBrix> findByParcelaOrderByFechaDesc(String parcela);
        List<MedicionBrix> findByParcelaAndFechaBetweenOrderByFechaAsc(String parcela, LocalDate desde, LocalDate hasta);
}
