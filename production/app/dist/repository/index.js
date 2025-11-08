"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor(db) {
        this.db = db;
    }
    async countVacancy(vacancy_id) {
        try {
            const sql = "SELECT * FROM vacancies WHERE id=$1 LIMIT 1";
            const select = await this.db.query(sql, [vacancy_id]);
            return select.rows;
        }
        catch (err) {
            throw new Error("Failed to select a vacancy");
        }
    }
    async selectVacancies() {
        try {
            const sql = `SELECT 
                v.*, 
                COUNT(a.id) AS total_accesses
                FROM vacancies v
                LEFT JOIN accessed_links a ON v.id = a.vacancy_id
                GROUP BY v.id;
            `;
            const values = await this.db.query(sql);
            return values.rows;
        }
        catch (err) {
            throw new Error("failed to select");
        }
    }
    async selectLinks(vacancy_id) {
        try {
            const sql = "SELECT * FROM links WHERE vacancy_id=$1";
            const values = await this.db.query(sql, [vacancy_id]);
            return values.rows;
        }
        catch (err) {
            throw new Error("Failed to select links");
        }
    }
    async createVacancy({ linkVacancy, description, resume_used, vacancy_level, status, plataform }) {
        try {
            const sql = `INSERT INTO vacancies (link_vacancy,description,resume_used,vacancy_level,status,plataform)
                VALUES($1,$2,$3,$4,$5,$6)`;
            await this.db.query(sql, [linkVacancy, description, resume_used, vacancy_level, status, plataform]);
        }
        catch (err) {
            throw new Error("Failed to create a vacancy");
        }
    }
    async createAcessLink({ original_link, code, vacancy_id, link_label }) {
        try {
            const sql = 'INSERT INTO links(original_link,code,vacancy_id,link_label) VALUES($1,$2,$3,$4)';
            await this.db.query(sql, [original_link, code, vacancy_id, link_label]);
        }
        catch (err) {
            throw new Error("Failed to create access link");
        }
    }
    async countAccess(selectNull) {
        try {
            const isNull = selectNull ? "IS NULL" : "IS NOT NULL";
            const sql = `SELECT COUNT(*) AS total_accessed_links FROM accessed_links WHERE vacancy_id ${isNull}`;
            const count = await this.db.query(sql);
            return count.rows[0];
        }
        catch (err) {
            throw new Error("Failed to count total acessed links");
        }
    }
}
exports.Repository = Repository;
