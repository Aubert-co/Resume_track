"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repository_1 = require("./repository");
const service_1 = require("./service");
const db_1 = require("./database/db");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const db = new db_1.Database();
const repository = new repository_1.Repository(db);
const service = new service_1.Service(repository);
const app = (0, express_1.default)();
const publicPath = path_1.default.join(__dirname, '..', "public");
app.use((0, cors_1.default)({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.get('/*splat', (req, res) => {
    res.sendFile(publicPath + '/index.html');
});
app.post('/create/vacancy', async (req, res, next) => {
    try {
        const { vacancy_level, link_vacancy, status, plataform, description, resume_used } = req.body;
        if (!link_vacancy)
            return res.status(400).json({ message: 'Link vacancy is required.' });
        if (!vacancy_level)
            return res.status(400).json({ message: 'Vacancy level is required.' });
        if (!status)
            return res.status(400).json({ message: 'Status is required.' });
        if (!plataform)
            return res.status(400).json({ message: 'Plataform is required.' });
        if (!description)
            return res.status(400).json({ message: 'Description is required.' });
        if (!resume_used)
            return res.status(400).json({ message: 'Resume used is required.' });
        await service.createVacancy({
            vacancy_level, linkVacancy: link_vacancy,
            status, plataform, description, resume_used
        });
        res.status(201).send({ message: 'sucess' });
    }
    catch (err) {
        next(err);
    }
});
app.post('/generate-link', async (req, res, next) => {
    try {
        const { vacancy_id, original_link, link_label } = req.body;
        if (!vacancy_id)
            return res.status(400).json({ error: 'Missing vacancy_id' });
        if (!original_link)
            return res.status(400).json({ error: 'Missing original_link' });
        await service.createAcessLink({
            link_label,
            original_link,
            vacancy_id,
        });
        res.status(201).send({ message: 'sucess' });
    }
    catch (err) {
        next(err);
    }
});
app.get('/resumes', async (req, res, next) => {
    try {
        const datas = await service.selectVacancies();
        res.status(200).send({ datas, message: 'success' });
    }
    catch (err) {
        next(err);
    }
});
app.get('/count/access', async (req, res, next) => {
    try {
        const datas = await service.countAccessedLinks();
        res.status(200).send({ message: 'success', datas });
    }
    catch (err) {
        next(err);
    }
});
app.get('/get/links/:link', async (req, res, next) => {
    try {
        const links = req.params.link;
        if (!links)
            return res.status(400).send({ message: 'link is required' });
        const datas = await service.selectLinks(Number(links));
        res.status(200).send({ message: 'succes', datas });
    }
    catch (err) {
        next(err);
    }
});
app.use((error, req, res) => {
    if (error instanceof Error) {
        res.status(500).send({ message: error.message });
        return;
    }
    res.status(500).send({ message: 'unknown error' });
});
app.listen(process.env.PORT, () => {
    console.log('running');
});
