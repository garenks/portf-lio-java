package br.com.fecaf.gestao_carro.controller;

import br.com.fecaf.gestao_carro.model.Carro;
import br.com.fecaf.gestao_carro.services.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carros")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class CarroController {

    @Autowired
    private CarroService carroService;

    @GetMapping("/listarCarro")
    public List<Carro> listarCarro() {
        return carroService.listarCarros();
    }

    @PostMapping("/cadastrarCarro")
    public ResponseEntity<Carro> salvarCarro(@RequestBody Carro carro) {
        Carro newCarro = carroService.salvarCarro(carro);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCarro);
    }

    @DeleteMapping("/deletarCarro/{id}")
    public ResponseEntity<Void> deletarCarro(@PathVariable int id) {
        try {
            carroService.deletarCarro(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/atualizarCarro/{id}")
    public ResponseEntity<Carro> atualizarCarro(@PathVariable int id, @RequestBody Carro carroDetails) {
        try {
            Carro carroAtualizado = carroService.atualizarCarro(id, carroDetails);
            return new ResponseEntity<>(carroAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Carro>> buscarCarros(@RequestParam(required = false) String termo) {
        List<Carro> carros = carroService.buscarCarrosPorTermo(termo);
        return ResponseEntity.ok(carros);
    }
}
