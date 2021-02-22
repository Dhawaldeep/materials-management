import { Router } from "express";

import { MaterialsController } from "./materials.controller";
// import swagger from "swagger-jsdoc";
// import swaggerUI from "swagger-ui-express";

/**
 * @swagger
 * 
 * definitions:
 *  Material:
 *      properties:
 *          id:
 *              type: string
 *          name:
 *              type: string
 *          color:
 *              type: string
 *          volume:
 *              type: integer
 *          cost:
 *              type: integer
 *          deliveryDate:
 *              type: string
 */

const router = Router();
const controller = new MaterialsController()

/**
 * @swagger
 * 
 * /api:
 *  get:
 *   tags:
 *   - Material
 *   description: get all Materials
 *   produces: application/json
 *   responses:
 *      '200':
 *          description: Get all Materials 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: array
 *                                  items:
 *                                      $ref: '#definitions/Material'
 *                          message:
 *                              type: string
 *      '400':
 *          description: A bad request
 *          content:
 *              application/json:
 *                schema:
 *                 $ref: '#components/schemas/Error'
 *      '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/Error'
 * 
 */

router.get('/', controller.getAll);

/**
 * @swagger
 * 
 * /api:
 *  post:
 *   tags:
 *   - Material
 *   description: Add a Material
 *   produces: application/json
 *   requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                  $ref: '#definitions/Material'
 *   responses:
 *      '201':
 *          description: A Material object
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              properties:
 *                                  $ref: '#definitions/Material'
 *                          message:
 *                              type: string
 *      '400':
 *          description: A bad request
 *          content:
 *              application/json:
 *                schema:
 *                 $ref: '#components/schemas/Error'
 *      '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/Error'
 * 
 *  components:
 *      schemas:
 *        # Schema for error response body
 *        Error:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *              data:
 *                  type: object
 *              message:
 *                  type: string
 *
 */

router.post('/', controller.create);

/**
 * @swagger
 * 
 * /api:
 *  put:
 *   tags:
 *   - Material
 *   description: Add a Material
 *   produces: application/json
 *   requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                  $ref: '#definitions/Material'
 *   responses:
 *      '201':
 *          description: A Material object
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              properties:
 *                                  $ref: '#definitions/Material'
 *                          message:
 *                              type: string
 *      '400':
 *          description: A bad request
 *          content:
 *              application/json:
 *                schema:
 *                 $ref: '#components/schemas/Error'
 *      '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/Error'
 * 
 *
 */

router.put('/', controller.update);


/**
 * @swagger
 * 
 * /api/{id}:
 *  delete:
 *   tags:
 *   - Material
 *   description: Remove a material
 *   produces: application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *          type: string   
 *   responses:
 *      '202':
 *          description: Deleted a Comment
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                          message:
 *                              type: string
 *      '404':
 *          description: Not Found
 *          content:
 *              application/json:
 *                schema:
 *                 $ref: '#components/schemas/Error'
 *      '400':
 *          description: A bad request
 *          content:
 *              application/json:
 *                schema:
 *                 $ref: '#components/schemas/Error'
 *      '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#components/schemas/Error'
 * 
 */
router.delete('/:id', controller.delete);

// const swaggerSpec = swagger({
//     definition: {
//         openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
//         info: {
//             title: 'Material Management Rest API', // Title (required)
//             version: '0.0.0', // Version (required)
//         },
//         basePath: '/api',
//         tags: [
//             {
//                 name: 'Material',
//                 description: 'Handles saving, updation, deletion and operations of material'
//             },
//         ]
//     }
// })

// router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default router