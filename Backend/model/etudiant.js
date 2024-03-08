const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema } = mongoose;

const EtudiantShema = new Schema({
    firstname: String,
    lastname: String,
    matricule: {
        type: String,
        unique: true
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departement'
    },
    deleted: {
        type: Boolean,
        default: false // Par défaut, l'étudiant n'est pas supprimé
    }
}, { timestamps: true });

// Add the mongoose-delete plugin
// EtudiantShema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Etudiant', EtudiantShema);
