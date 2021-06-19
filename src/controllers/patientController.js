const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Physicians = require("../models/Physician");
const Sequelize = require("sequelize");

module.exports = {
    async listAllPatients(request, response) {
        const patients = await Patient.findAll({
            order: [
                ["name", "ASC"]
            ],
        }).catch((exception) => {
            console.log(exception);
            response.status(500).json({ msg: "Falha na conexão." });
        });
        if (patients) response.status(200).json({ patients });
        else response.status(404).json({ msg: "Não foi possível encontrar pacientes." });
    },

    async searchPatientByName(req, res) {
        const name = req.body.name;
        if (!name)
            res.status(400).json({
                msg: "Não foi inserido parâmetro de nome.",
            });
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: {
                name: {
                    [Op.like]: "%" + name + "%"
                }
            },
        });
        if (patient) {
            if (patient == "")
                res.status(404).json({ msg: "Paciente não foi encontrado" });
            else res.status(200).json({ patient });
        } else
            res.status(404).json({
                msg: "Paciente não foi encontrado.",
            });
    },

    async newPatient(request, response) {
        const { name, email, phone } = request.body;
        if (!name || !email || !phone) {
            response.status(400).json({ msg: "Campo inválido." });
        } else {
            if (!isNaN(name)) response.status(400).json({ msg: "Nome Inválido." });
            if (isNaN(phone)) response.status(400).json({ msg: "Telefone Inválido." });

            const isPatientNew = await Patient.findOne({ where: { email }, });
            if (isPatientNew) response.status(403).json({ msg: "Email já cadastrado." });
            else {
                const patient = await Patient.create({
                    name,
                    email,
                    phone,
                }).catch((exception) => {
                    response.status(500).json({ msg: "Não foi possível inserir dados. :( ;-; D:" });
                });
                if (patient) response.status(201).json({ msg: "Paciente foi adicionado." });
                else response.status(404).json({ msg: "Não foi possível cadastrar um novo paciente. :( ;-; D:" });
            }
        }
    },

    async updatePatient(request, response) {
        const patientId = request.body.id;
        const patient = request.body;
        if (!patientId) response.status(400).json({ msg: "Id do paciente não informado." });
        else {
            const patientExists = await Patient.findByPk(patientId);
            if (!patientExists) response.status(404).json({ msg: "Paciente não encontrado." });
            else {
                if (patient.name || patient.email || patient.phone) {
                    await Patient.update(patient, { where: { id: patientId }, });
                    return response.status(200).json({ msg: "Paciente editado com sucesso." });
                } else response.status(400).json({ msg: "Dados obrigatórios não preenchidos." });
            }
        }
    },

    async searchPatientByPhysicianId(req, res) {
        const physicianId = req.params.id;
        if (!physicianId)
            res.status(400).json({
                msg: "O médico não existe.",
            });
        const physicianExists = await Appointment.findAll({
                where: {
                    physicianId: physicianId
                },
                include: Patient
            })
            .catch((error) => res.status(500).json({ error }));
        var myJsonString = JSON.stringify(physicianExists);
        const obj = JSON.parse(myJsonString)
        const patients = obj.patientId
            //const patients = json.patientId
        if (physicianExists) {
            if (physicianExists == "")
                res.status(404).json({ msg: "Não há consultas para este médico." });
            else res.status(200).json({ obj });
        } else res.status(404).json({ msg: "Não foi possível encontrar consultas." });
    },

};