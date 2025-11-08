"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const decodeUrl_1 = require("../constants/decodeUrl");
class Service {
    constructor(repository) {
        this.repository = repository;
    }
    async createAcessLink({ vacancy_id, link_label, original_link }) {
        link_label = link_label.toLocaleLowerCase();
        const encoded = (0, decodeUrl_1.encodeId)(vacancy_id, link_label);
        const existsVacancy = await this.repository.countVacancy(vacancy_id);
        if (existsVacancy.length === 0) {
            throw new Error("no vacancies");
        }
        await this.repository.createAcessLink({
            original_link,
            vacancy_id,
            code: encoded,
            link_label
        });
    }
    async createVacancy(datas) {
        return await this.repository.createVacancy(datas);
    }
    async selectVacancies() {
        return await this.repository.selectVacancies();
    }
    async countAccessedLinks() {
        const withRegister = await this.repository.countAccess(true);
        const withoutRegister = await this.repository.countAccess(false);
        return { no_register: withoutRegister.total_accessed_links, with_register: withRegister.total_accessed_links };
    }
    async selectLinks(vacancy_id) {
        return await this.repository.selectLinks(vacancy_id);
    }
}
exports.Service = Service;
