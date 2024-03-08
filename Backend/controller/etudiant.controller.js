const Etudiant = require('../model/etudiant')
const create = async (req,res)=>{
   try{
    const etudiant = await Etudiant.create(req.body);
    res.json({ message: "L'étudiant  a été créé avec succès." });
   }catch(error){
    res.send({error: "Une erreur s'est produite"});
    console.log(error);
   }   
}

const getAll = async (req, res) => {
  try {
      const etudiants = await Etudiant.find({ deleted: false }).populate('departement');
      // const etudiants1 = await Etudiant.find().populate('departement');
      res.json(etudiants);
  } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des étudiants." });
      console.log(error);
  }
};


const supprimer = async (req, res) => {
    const { id } = req.params;
    try {
        // const etudiant = await Etudiant.findByIdAndUpdate(id, { deleted: true }, { new: true });
        const etudiant = await Etudiant.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!etudiant) {
            res.status(404).json({ error: "L'étudiant n'a pas été trouvé." });
            return;
        }
        res.json({ message: "L'étudiant a été marqué comme supprimé avec succès." });
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
        res.status(500).json({ error: "Une erreur s'est produite lors de la modification de l'étudiant." });
        console.log(error);
    }
}

module.exports = {
    create,
    getAll,
    supprimer,
    modifier
}
