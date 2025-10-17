package com.costero.vc.repository;

import com.costero.vc.entity.Embarque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmbarqueRepository extends JpaRepository<Embarque, Long> {
	java.util.List<Embarque> findByCompradores_Id(Long compradorId);
	org.springframework.data.domain.Page<Embarque> findByDestinoContainsIgnoreCaseOrTransportistaContainsIgnoreCaseOrEstadoContainsIgnoreCase(String dest, String trans, String estado, org.springframework.data.domain.Pageable p);
}
