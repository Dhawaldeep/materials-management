"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsController = void 0;
const APIError_1 = require("./helpers/APIError");
const APIResponse_1 = require("./helpers/APIResponse");
const materials_model_1 = require("./materials.model");
class MaterialsController {
    getAll(_, res) {
        const materials = materials_model_1.MaterialsModel.getAll();
        return res.status(200).json(new APIResponse_1.APIResponse(materials, 'Materials Fetched!', 200));
    }
    create(_, res) {
        const material = materials_model_1.MaterialsModel.create();
        return res.status(201).json(new APIResponse_1.APIResponse(material, 'Material Created!', 201));
    }
    update(req, res) {
        try {
            const material = req.body;
            if (!material.id)
                return res.status(400).json(new APIError_1.APIError('Material Id not provided'));
            console.log(material);
            const updatedMaterial = materials_model_1.MaterialsModel.update(material);
            return res.status(202).json(new APIResponse_1.APIResponse(updatedMaterial, 'Material Updated!', 202));
        }
        catch (error) {
            return res.status(404).json(new APIError_1.APIError(error.message, 404, error));
        }
    }
    delete(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                return res.status(400).json(new APIError_1.APIError('Material Id is undefined'));
            const removedId = materials_model_1.MaterialsModel.delete(id);
            return res.status(202).json(new APIResponse_1.APIResponse(removedId, 'Material Deleted!', 202));
        }
        catch (error) {
            return res.status(404).json(new APIError_1.APIError(error.message, 404, error));
        }
    }
}
exports.MaterialsController = MaterialsController;
