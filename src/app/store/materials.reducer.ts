import { createReducer, on } from '@ngrx/store';
import { Material } from '../models/material.model';
import * as alias from './materials.actions';

export interface MaterialState {
    init: boolean,
    materials: { [id: string]: Material },
    unsaved: string[],
    unremoved: { [id: string]: Material },
    selected: Material | null,
    loading: boolean,
    error: Error | null
};

export const initialState: MaterialState = {
    init: false,
    materials: {},
    unsaved: [],
    unremoved: {},
    selected: null,
    loading: false,
    error: null
};

export const materialReducer = createReducer(
    initialState,
    on(alias.online, alias.bulkRemoveStart, (state)=>({...state})),
    on(alias.readStart, (state) => ({ ...state, loading: true, init: true })),
    on(alias.produceStart, (state, action) => {
        return {
            ...state,
            loading: !action.edit,
            selected: action.edit ? action.payload! : null
        }
    }),
    on(alias.produce, (state, action) => {
        return {
            ...state,
            materials: {
                ...state.materials,
                [action.payload.id as string]: action.payload,
            },
            selected: action.payload,
            loading: false
        }
    }),
    on(alias.read, (state, action) => {
        return {
            ...state,
            loading: false,
            materials: action.payload.reduce((acc, curr) => {
                return {
                    ...acc,
                    [curr.id!]: curr
                }
            }, {} as { [id: string]: Material }),
            unremoved: {}
        }
    }),
    on(alias.update, (state, action) =>
    (
        {
            ...state,
            materials: {
                ...state.materials,
                [action.payload.id!]: {
                    ...action.payload
                }
            },
            error: null
        }
    )),
    on(alias.remove, (state, action) => {
        const unremoved = { ...state.unremoved };
        delete unremoved[action.payload];
        return {
            ...state,
            selected: null,
            loading: false,
            unremoved
        }
    }),
    on(alias.removeStart, (state) => {
        const selected = { ...state.selected };
        const materials = { ...state.materials };
        console.log('Remove Start Selected', selected, )
        if (selected) {
            delete materials[selected.id!];
        }
        return {
            ...state,
            loading: true,
            materials,
            error: null
        }
    }),
    on(alias.save, (state, action) => (
        {
            ...state,
            unsaved: state.unsaved.slice().filter(id => id !== action.payload)
        })),
    on(alias.error, (state, action) => {
        switch (action.typeError) {
            case 'save':
                const unsaved: string[] = [];
                new Set([...state.unsaved, action.payload]).forEach(val => {
                    unsaved.push(val as string);
                })
                return {
                    ...state,
                    error: action.error,
                    unsaved,
                    loading: false
                }
            case 'remove':
                const materials = { ...state.materials };
                delete materials[(action.payload as Material).id!]
                return {
                    ...state,
                    error: action.error,
                    materials,
                    unremoved: {
                        ...state.unremoved,
                        [(action.payload as Material).id!]: action.payload as Material
                    },
                    loading: false
                }
            case 'produce':
                return {
                    ...state,
                    error: action.error,
                    loading: false
                }
            default:
                return {
                    ...state,
                    error: action.error,
                    loading: false
                }
        }
    })
);