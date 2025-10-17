-- Sample seed data for Vino Costero
-- Tipos de uva
INSERT INTO tipo_uva (id, nombre, tipo, tiempo_maduracion, caracteristicas) VALUES (1, 'Cabernet Sauvignon', 'tinta', 120, 'Aroma a frutos negros');
INSERT INTO tipo_uva (id, nombre, tipo, tiempo_maduracion, caracteristicas) VALUES (2, 'Chardonnay', 'blanca', 110, 'Aromas cítricos y mantequilla');

-- Enfermedades
INSERT INTO enfermedad (id, nombre, sintomas, agente_causante, tratamiento_recomendado, nivel_riesgo, foto_path) VALUES (1, 'Mildiu', 'Manchas amarillas en hojas', 'Plasmopara viticola', 'Aplicar fungicida sistémico', 'alto', NULL);
INSERT INTO enfermedad (id, nombre, sintomas, agente_causante, tratamiento_recomendado, nivel_riesgo, foto_path) VALUES (2, 'Oidio', 'Polvo blanquecino en hojas', 'Erysiphe necator', 'Azufre en polvo', 'medio', NULL);

-- Compradores
INSERT INTO comprador (id, nombre_razon_social, tax_id, contacto, tipo_cliente, estado) VALUES (1, 'Distribuciones LA', 'TAX123', 'contacto@la.example', 'distribuidor', 'activo');
INSERT INTO comprador (id, nombre_razon_social, tax_id, contacto, tipo_cliente, estado) VALUES (2, 'Restaurante El Paso', 'TAX456', 'reservas@elpaso.example', 'restaurante', 'activo');

-- Embarques
INSERT INTO embarque (id, fecha_envio, transportista, destino, condiciones_transporte, estado, documentacion) VALUES (1, '2025-10-10', 'Transportes Rápidos', 'Santiago, CL', 'Refrigerado', 'preparando', 'B/L 1001');
INSERT INTO embarque (id, fecha_envio, transportista, destino, condiciones_transporte, estado, documentacion) VALUES (2, '2025-10-12', 'Naviera Costa', 'Valparaíso, CL', 'Seco', 'en tránsito', 'B/L 1002');

-- Link embarque-comprador (many-to-many join table)
INSERT INTO embarque_comprador (embarque_id, compradores_id) VALUES (1, 1);
INSERT INTO embarque_comprador (embarque_id, compradores_id) VALUES (2, 2);

-- Estados sanitarios y tratamientos
INSERT INTO estado_sanitario (id, parcela, fecha_inspeccion, estado_general, enfermedad_detectada_id) VALUES (1, 'Parcela A', '2025-10-01', 'en observación', 1);
INSERT INTO tratamiento (id, fecha, producto, observaciones, estado_sanitario_id) VALUES (1, '2025-10-02', 'Fungicida X', 'Aplicación preventiva', 1);

-- Mediciones Brix
INSERT INTO medicion_brix (id, parcela, fecha, grados_brix, variedad_id, responsable) VALUES (1, 'Parcela A', '2025-10-01', 19.5, 1, 'Inspector 1');
INSERT INTO medicion_brix (id, parcela, fecha, grados_brix, variedad_id, responsable) VALUES (2, 'Parcela A', '2025-10-08', 21.0, 1, 'Inspector 2');
INSERT INTO medicion_brix (id, parcela, fecha, grados_brix, variedad_id, responsable) VALUES (3, 'Parcela B', '2025-10-05', 17.8, 2, 'Inspector 3');

-- Alertas
INSERT INTO alerta (id, tipo, mensaje, fecha, parcela) VALUES (1, 'MEDICION_Brix', 'Grados Brix 21.0 en Parcela A supera umbral 20.0', '2025-10-08 08:00:00', 'Parcela A');
-- Sample data for TipoUva
INSERT INTO tipo_uva (id, nombre, tipo, tiempo_maduracion, caracteristicas) VALUES (1, 'Sauvignon Blanc', 'blanca', 120, 'Aromas cítricos y herbáceos');
INSERT INTO tipo_uva (id, nombre, tipo, tiempo_maduracion, caracteristicas) VALUES (2, 'Chardonnay', 'blanca', 135, 'Notas de manzana, mantequilla con roble suave');

-- Sample Comprador
INSERT INTO comprador (id, nombre_razon_social, tax_id, contacto, tipo_cliente, estado) VALUES (1, 'Distribuciones Costero', '76.123.456-7', 'contacto@costero.cl', 'distribuidor', 'activo');
