const mongoose = require("mongoose");
const Etudiant = require("./etudiant");
const { Schema } = mongoose

const DepartementSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    deleted: {
        type: Boolean,
        default: false // Par défaut, l'étudiant n'est pas supprimé
    }
},{timestamps:true})

DepartementSchema.pre("findOneAndUpdate", async function(next) {
    try {
        const docToUpdate = await this.model.findOne(this.getQuery());
        const updatedDoc = this.getUpdate();
        if (updatedDoc.deleted === true && docToUpdate.deleted === false) {
            // Si le département est marqué comme supprimé et n'était pas supprimé auparavant
            // Alors marquez tous les étudiants associés comme supprimés également
            await Etudiant.updateMany({ departement: docToUpdate._id }, { deleted: true });
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Departement',DepartementSchema)
