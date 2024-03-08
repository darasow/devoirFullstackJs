const Departement = require('../model/departement');

const create = async (req, res) => {
    try {
        const departement = await Departement.create(req.body);
        res.json({ message: "Le département a été créé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la création du département." });
        console.log(error);
    }
};

const getAll = async (req, res) => {
    const departements = await Departement.find({ deleted: false });
    res.json(departements);
};

const supprimer = async (req, res) => {
    const { id } = req.params;
    try {
        // await Departement.findByIdAndUpdate(id, { deleted: true }, { new: true });
        await Departement.findByIdAndUpdate(id, { deleted: true }, { new: true });
        res.json({ message: "Le département a été supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du département." });
        console.log(error);
    }
};

const modifier = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Departement.findByIdAndUpdate(id, { name });
        res.json({ message: "Le département a été modifié avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la modification du département." });
        console.log(error);
    }
};

module.exports = {
    create,
    getAll,
    supprimer,
    modifier
};
