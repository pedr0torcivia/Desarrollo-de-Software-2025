const express = require('express');
const { keycloak } = require('../config/keycloak');
const productosController = require('../controllers/productosController');

const router = express.Router();

router.get('/', keycloak.protect('realm:read_only'), productosController.getAllproductos);
router.get('/:id', keycloak.protect('realm:read_only'), productosController.getProductById);
router.post('/', keycloak.protect('realm:admin'), productosController.createProduct);
router.put('/:id', keycloak.protect('realm:admin'), productosController.updateProduct);
router.delete('/:id', keycloak.protect('realm:admin'), productosController.deleteProduct);

module.exports = router;
