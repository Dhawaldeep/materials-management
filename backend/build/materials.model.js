"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsModel = exports.Material = void 0;
const uuid_1 = require("uuid");
class Material {
    constructor(id, name, color, volume, cost, deliveryDate) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.volume = volume;
        this.cost = cost;
        this.deliveryDate = deliveryDate;
        this.id = uuid_1.v4();
    }
}
exports.Material = Material;
class MaterialsModel {
    static getAll() {
        const materials = [];
        for (const material of this.materials.values()) {
            materials.push(material);
        }
        return materials;
    }
    static create() {
        const material = new Material();
        this.materials.set(material.id, material);
        return this.materials.get(material.id);
    }
    static update(material) {
        if (this.materials.has(material.id)) {
            this.materials.set(material.id, material);
            return this.materials.get(material.id);
        }
        else {
            throw new Error(`Material with given '${material.id}' id does not exists in the records.`);
        }
    }
    static delete(id) {
        if (this.materials.has(id)) {
            this.materials.delete(id);
            return id;
        }
        else {
            throw new Error(`Material with given '${id}' id does not exists in the records.`);
        }
    }
}
exports.MaterialsModel = MaterialsModel;
MaterialsModel.materials = new Map();
