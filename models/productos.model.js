import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    etiquetas : {
         type: [String],
         required: false
    },
    imagen: {
        type: String,
        required: false
    }
});

const Producto = mongoose.model('Producto', productoSchema);
export default Producto;