const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation(password) {
    if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra.";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número.";
    else return "OK";
}

function generateToken(id) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 82800,
    });
    return token;
}

module.exports = {
    async listAllPhysicians(req, res) {
        const physicians = await Physician.findAll({
            order: [
                ["name", "ASC"]
            ],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha de conexão." });
        });
        if (physicians) res.status(200).json({ physicians });
        else
            res.status(404).json({ msg: "Não foi possível encontrar médicos." });
    },

    async newPhysician(req, res) {
        const { name, email, password } = req.body;
        if (!name || !password || !email || !isNaN(name)) {
            res.status(400).json({ msg: "Preencha todos os dados obrigatorios." });
        } else {

            const passwordValid = passwordValidation(password);
            if (passwordValid !== "OK")
                return res.status(400).json({ msg: passwordValid });
            //Procurar no BD por medico já existente
            const isPhysicianNew = await Physician.findOne({
                where: { email },
            });

            const isPhysicianNewEmail = await Physician.findOne({
                where: { email: email },
            });

            if (isPhysicianNewEmail)
                res.status(403).json({ msg: "Médico já existe no sistema." });
            else {
                const salt = bcrypt.genSaltSync(12);
                const hash = bcrypt.hashSync(password, salt);
                const physician = await Physician.create({
                    name,
                    email,
                    password: hash,
                }).catch((error) => {
                    res.status(500).json({ msg: "não foi possivel cadastrar no sistema" });
                });
                if (physician)
                    res.status(201).json({ msg: "Novo médico adicionado." });
                else
                    res.status(404).json({ msg: "Não foi possível cadastrar novo médico." });
            }
        }
    },

    async updatePhysician(req, res) {
        const physicianId = req.body.id;
        const physician = req.body;
        if (!physicianId)
            res.status(400).json({ msg: "Campo Id nao pode ser nulo" });
        else {
            const physicianExists = await Physician.findByPk(physicianId);
            if (!physicianExists)
                res.status(400).json({ msg: "Medico não encontrado." });
            else {
                if (physician.name || physician.password || physician.email) {
                    await Physician.update(physician, {
                        where: { id: physicianId },
                    });
                    return res.status(200).json({ msg: "Médico atualizado com sucesso." });
                } else
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    async deletePhysician(req, res) {
        const physicianId = req.params.id;
        const deletedPhysician = await Physician.destroy({
            where: { id: physicianId },
        }).catch(async(error) => {
            const physicianHasRef = await Appointment.findOne({
                where: { physicianId },
            }).catch((error) => {
                res.status(500).json({ msg: "não foi possivel conectar." });
            });
            if (physicianHasRef)
                return res.status(403).json({ msg: "Há consultas agendadas para esse médico." });
        });
        if (deletedPhysician != 0)
            res.status(404).json({ msg: "Medico deletado com sucesso" });
        else res.status(200).json({ msg: "O não existe" });
    },
    logout(req, res) {
        process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
        res.sendStatus(200);
    },
};