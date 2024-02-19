const Etudiant = require('../model/etudiant')


const create = async (req,res)=>{
   try{
    const etudiant = await Etudiant.create(req.body);
    res.json({ message: "Le departement a éte créer avec succès." });
   }catch(error){
    res.send({error: "une erreur s'est produite"})
    console.log(error)
   }
    
}

const getAll = async (req,res)=>{
    const etudiants = await Etudiant.find().populate('departement');
    res.send(etudiants)
}

const supprimer = async (req, res) => {
    const { id } = req.params;
    try {
      await Etudiant.findByIdAndDelete(id);
      res.json({ message: "L'étudiant a été supprimé avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'étudiant." });
      console.log(error);
    }
  };
  
const modifier = async (req, res) => {
    const { id } = req.params; 
    const { firstname, lastname, matricule, departement } = req.body; 
    try {
        await Etudiant.findByIdAndUpdate(id, { firstname, lastname, matricule, departement });
        res.json({ message: "L'étudiant a été modifié avec succès." });
    } catch (error) {
        res.status(500).json({error: "Une erreur s'est produite lors de la modification de l'étudiant."});
        console.log(error);
    }
}


module.exports = {
    create,
    getAll,
    supprimer,
    modifier
}