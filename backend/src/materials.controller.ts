import { Request, Response } from "express";
import { Material } from "./materials.model";
import { APIError } from "./helpers/APIError";
import { APIResponse } from "./helpers/APIResponse";
import { MaterialsModel } from "./materials.model";

export class MaterialsController {
    getAll(_: Request, res: Response) {
        const materials = MaterialsModel.getAll();
        return res.status(200).json(new APIResponse(materials, 'Materials Fetched!', 200));
    }

    create(_: Request, res: Response) {
        const material = MaterialsModel.create();
        return res.status(201).json(new APIResponse(material, 'Material Created!', 201));
    }

    update(req: Request, res: Response) {
        try {
            const material: Material = req.body;
            if(!material.id) return res.status(400).json(new APIError('Material Id not provided'));
            console.log(material);
            const updatedMaterial = MaterialsModel.update(material);
            return res.status(202).json(new APIResponse(updatedMaterial, 'Material Updated!', 202));
        } catch (error) {
            return res.status(404).json(new APIError(error.message, 404, error))
        }
    }

    delete(req: Request, res: Response) {
        try {
            const {id} = req.params;
            if(!id) return res.status(400).json(new APIError('Material Id is undefined'));
            const removedId = MaterialsModel.delete(id);
            return res.status(202).json(new APIResponse(removedId, 'Material Deleted!', 202));
        } catch (error) {
            return res.status(404).json(new APIError(error.message, 404, error))
        }
    }
}
