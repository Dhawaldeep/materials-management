import { createAction, props } from '@ngrx/store';
import { Material } from '../models/material.model';

// produce start action
export const produceStart = createAction('[MATERIAL] produceStart', props<{payload: Material| null, edit: boolean}>());

// produce action
export const produce = createAction('[MATERIAL] produce', props<{payload: Material}>());

// edit action
export const update = createAction('[MATERIAL] update', props<{payload: Material}>());

// remove start action
export const removeStart = createAction('[MATERIAL] removeStart');

// bulk remove start action
export const bulkRemoveStart = createAction('[MATERIAL] bulkRemoveStart', props<{payload: string}>());

// remove action
export const remove = createAction('[MATERIAL] remove', props<{payload: string}>());

// read start action
export const readStart = createAction('[MATERIAL] readStart');

// read action
export const read = createAction('[MATERIAL] read', props<{payload: Material[]}>());

// save start action
export const saveStart = createAction('[MATERIAL] saveStart', props<{payload: Material}>())

// save action
export const save = createAction('[MATERIAL] save', props<{payload: Material}>())

// online action
export const online = createAction('[MATERIAL] save');

// error action
export const error = createAction('[MATERIAL] error', props<{typeError: 'produce'|'save'|'remove'| 'bulkremove' | null, error: any, payload: Material|string|null}>())
