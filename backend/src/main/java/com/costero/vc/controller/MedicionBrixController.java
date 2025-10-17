package com.costero.vc.controller;

import com.costero.vc.entity.MedicionBrix;
import com.costero.vc.repository.MedicionBrixRepository;
import com.costero.vc.entity.Alerta;
import com.costero.vc.repository.AlertaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/mediciones-brix")
public class MedicionBrixController {
    private final MedicionBrixRepository repo;
    private final AlertaRepository alertaRepo;

    public MedicionBrixController(MedicionBrixRepository repo, AlertaRepository alertaRepo) { this.repo = repo; this.alertaRepo = alertaRepo; }

    @GetMapping
    public List<MedicionBrix> list(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<MedicionBrix> get(@PathVariable("id") Long id){
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MedicionBrix> create(@RequestBody MedicionBrix m, @RequestParam(value="umbral", required=false) Double umbral){
        MedicionBrix saved = repo.save(m);
        // comprobar alerta simple
        double threshold = umbral!=null?umbral:20.0;
        if(saved.getGradosBrix()!=null && saved.getGradosBrix()>=threshold){
            Alerta a = new Alerta();
            a.setTipo("MEDICION_BRIX");
            a.setMensaje("Medición en parcela '"+saved.getParcela()+"' supera umbral: "+saved.getGradosBrix());
            a.setFecha(java.time.LocalDateTime.now());
            a.setParcela(saved.getParcela());
            alertaRepo.save(a);
        }
        return ResponseEntity.created(URI.create("/api/mediciones-brix/"+saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicionBrix> update(@PathVariable("id") Long id, @RequestBody MedicionBrix m){
        m.setId(id);
        return ResponseEntity.ok(repo.save(m));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){ repo.deleteById(id); return ResponseEntity.noContent().build(); }

    // obtener mediciones por parcela ordenadas por fecha descendente
    @GetMapping("/parcela/{parcela}")
    public List<MedicionBrix> porParcela(@PathVariable("parcela") String parcela){
        return repo.findByParcelaOrderByFechaDesc(parcela);
    }

    // obtener mediciones en un rango (ISO yyyy-MM-dd)
    @GetMapping("/parcela/{parcela}/rango")
    public List<MedicionBrix> porParcelaRango(@PathVariable("parcela") String parcela, @RequestParam("desde") String desde, @RequestParam("hasta") String hasta){
        java.time.LocalDate d1 = java.time.LocalDate.parse(desde);
        java.time.LocalDate d2 = java.time.LocalDate.parse(hasta);
        return repo.findByParcelaAndFechaBetweenOrderByFechaAsc(parcela, d1, d2);
    }

    // tendencia simple: calcular pendiente de gradosBrix en el tiempo (mínimos cuadrados)
    @GetMapping("/parcela/{parcela}/tendencia")
    public ResponseEntity<?> tendencia(@PathVariable("parcela") String parcela){
        java.util.List<MedicionBrix> list = repo.findByParcelaOrderByFechaDesc(parcela);
        if(list.size()<2) return ResponseEntity.badRequest().body("Se requieren al menos 2 mediciones para calcular tendencia");
        // invertir para ascendente en fechas
        java.util.Collections.reverse(list);
        int n = list.size();
        double[] x = new double[n];
        double[] y = new double[n];
        for(int i=0;i<n;i++){ x[i] = list.get(i).getFecha().toEpochDay(); y[i] = list.get(i).getGradosBrix(); }
        double xmean = java.util.Arrays.stream(x).average().orElse(0);
        double ymean = java.util.Arrays.stream(y).average().orElse(0);
        double num=0, den=0;
        for(int i=0;i<n;i++){ num += (x[i]-xmean)*(y[i]-ymean); den += (x[i]-xmean)*(x[i]-xmean); }
        double slope = den==0?0:num/den; // grados Brix por día
        return ResponseEntity.ok(java.util.Map.of("slopePerDay", slope, "unit","brix/day", "points", n));
    }

    // alerta simple: verificar si última medición supera umbral
    @GetMapping("/parcela/{parcela}/alerta")
    public ResponseEntity<?> alerta(@PathVariable("parcela") String parcela, @RequestParam(value="umbral", required=false) Double umbral){
        java.util.List<MedicionBrix> list = repo.findByParcelaOrderByFechaDesc(parcela);
        if(list.isEmpty()) return ResponseEntity.ok(java.util.Map.of("alert", false, "message","No hay mediciones"));
        MedicionBrix last = list.get(0);
        double threshold = umbral!=null?umbral:20.0;
        boolean alert = last.getGradosBrix()!=null && last.getGradosBrix()>=threshold;
        return ResponseEntity.ok(java.util.Map.of("alert", alert, "lastBrix", last.getGradosBrix(), "threshold", threshold));
    }
}
