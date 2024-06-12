import { medic } from "../models/Medic.js";
//import { Office } from "../models/Office.js";

export async function getMedics(req, res) {
  try {
    const medics = await medic.findAll({
      attributes: ["id", "name", "speciality", "phone", "image"],
    });
    res.json(medics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createMedic(req, res) {
  const { name, speciality, phone, image, email, services, certifications, state } = req.body;
  try {
    let newMedic = await medic.create(
      {
        name,
        speciality,
        phone,
        image,
        email,
        services,
        certifications,
        state,
      },
      {
        fields: ["name", "speciality", "phone", "image", "email", "services", "certifications", "state"],
      }
    );
    return res.json(newMedic);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getMedic(req, res) {
  const { id } = req.params;
  try {
    const Medic = await medic.findOne({
      where: {
        id,
      },
    });
    res.json(Medic);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const updateMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, speciality, phone, email, services, certifications, state } = req.body;

    const medic = await medic.findByPk(id);
    if (!medic) return res.status(404).json({ message: "Medic not found" });

    medic.name = name;
    medic.speciality = speciality;
    medic.phone = phone;
    medic.email = email;
    medic.services = services;
    medic.certifications = certifications;
    medic.state = state;
    await medic.save();

    res.json(medic);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteMedic(req, res) {
  const { id } = req.params;
  try {
    await medic.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getMedicOffices(req, res) {
  const { id } = req.params;
  try {
    const offices = await Office.findAll({
      attributes: ["id", "medicId", "name"],
      where: { medicId: id },
    });
    res.json(offices);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
