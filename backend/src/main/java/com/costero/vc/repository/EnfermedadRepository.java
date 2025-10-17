package com.costero.vc.repository;

import com.costero.vc.entity.Enfermedad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnfermedadRepository extends JpaRepository<Enfermedad, Long> {
}
