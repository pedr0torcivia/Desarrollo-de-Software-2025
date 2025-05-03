import { DataTypes } from "sequelize"

const usuariosAttributes = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {                        
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaAlta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'fecha_alta'
    }
    
};


const usuariosMethods = {
    timestamps: false
}

const UsuariosModel = {
    usuariosAttributes,
    usuariosMethods
}

export { UsuariosModel }