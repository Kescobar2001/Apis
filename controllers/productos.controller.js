import Producto from '../models/productos.model.js';
import mongoose from 'mongoose';

export const getAllProductos = async (req, res) => {
    console.log('Obtiene todos los productos');
    try {
        const productos = await Producto.find({}, { __v: 0 });
        if (productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        res.status(200).json({ productos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};
export const getProductoById = async (req, res) => {
    console.log('PRODUCTO POR ID');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const producto = await Producto.findById(id);
        if(!producto){
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        return res.status(200).json({
            producto
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener el producto'
        });
    }
};
export const postProducto = async (req, res) => {
    console.log('POST PRODUCTO');
    const body = req.body;
    const producto = new Producto(body);
    try {
        const validationError = producto.validateSync();
        if(validationError){
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await producto.save();
        return res.status(201).json({
            msg: 'Producto guardado correctamente',
            producto
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al guardar el producto'
        });
    }
};
export const putProducto = async (req, res) => {
    console.log('PUT PRODUCTO');
    const id = req.params.id;
    const body = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const producto = await Producto.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if(!producto){
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'Producto actualizado correctamente',
            producto
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el producto'
        });
    }
};
export const deleteProducto = async (req, res) => {
    console.log('DELETE PRODUCTO');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const producto = await Producto.findByIdAndDelete(id);
        if(!producto){
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'Producto eliminado correctamente',
            producto
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar el producto'
        });
    }
};