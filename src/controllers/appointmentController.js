const Appointment = require("../models/Appointment");

module.exports = {
    async searchAppointmentByPatientId(req, res) {
        let id = req.params.id
        if (id === undefined || id === null) {
            res.status(404).json({ msg: "O parâmetro ID do paciente não foi encontrado!" })
        } else {
            id = Number(id)
            const appointments = await Appointment.findAll({
                where: { patientId: id }
            }).catch((error) => res.status(500).json({ msg: "Não foi possível encontrar as consultas!" }))
            if (appointments.length > 0) {
                res.status(200).json({ appointments })
            } else {
                res.status(200).json({ msg: "Sem consultas para esse paciente." })
            }
        }
    },
    async searchAppointmentByPhysicianId(req, res) {
        let id = req.params.id
        if (id === undefined || id === null) {
            res.status(404).json({ msg: "O parâmetro ID do médico não foi encontrado!" })
        } else {
            id = Number(id)
            const appointments = await Appointment.findAll({
                where: { physicianId: id }
            }).catch((error) => res.status(500).json({ msg: "Não foi possível encontrar as consultas!" }))
            if (appointments.length > 0) {
                res.status(200).json({ appointments })
            } else {
                res.status(200).json({ msg: "Sem consultas para esse médico." })
            }
        }
    },
    async newAppointment(req, res) {
        let { patientId, description, physicianId } = req.body;
        if (!patientId || !description || !physicianId) {
            res.status(404).json({ msg: "Envie todos os dados solicitados." });
        } else {
            const appointment = await Appointment.create({
                description,
                physicianId,
                patientId,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível criar a consulta!" })
            })
            if (appointment)
                res.status(201).json({ appointment })
            else
                res.status(404).json({ msg: "Não foi possível criar a consulta!" })
        }
    },
    async deleteAppointment(req, res) {
        let id = req.params.id

        if (id === undefined || id === null) {
            res.status(404).json({ msg: "O parâmetro ID da consulta não foi encontrado!" })
        } else {
            id = Number(id)
            const appointment = await Appointment.destroy({
                where: { id: id }
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível excluir a consulta!" })
            })
            if (appointment != 0)
                res.status(200).json({ msg: "Consulta excluida com sucesso!" })
            else
                res.status(404).json({ msg: "Não foi possível excluir a consulta!" })
        }
    },
}