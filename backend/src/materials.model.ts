import { v4 } from "uuid";

export class Material{
    constructor(public id?: string, public name?: string, public color?: string, public volume?: number, public cost?: number, public deliveryDate?: Date){
        this.id = v4();
    }
}

export abstract class MaterialsModel{
    static materials: Map<string, Material> = new Map();

    static getAll(){
        const materials = []
        for (const material of this.materials.values()) {
            materials.push(material)
        }
        return materials
    }

    static create(){
        const material = new Material();
        this.materials.set(material.id!, material);
        return this.materials.get(material.id!);
    }

    static update(material: Material){
        if(this.materials.has(material.id!)){
            this.materials.set(material.id!, material);
            return this.materials.get(material.id!);
        }else{
            throw new Error(`Material with given '${material.id}' id does not exists in the records.`);
        }
    }

    static delete(id: string){
        if(this.materials.has(id)){
            this.materials.delete(id);
            return id;
        }else{
            throw new Error(`Material with given '${id}' id does not exists in the records.`);
        }
    }
}