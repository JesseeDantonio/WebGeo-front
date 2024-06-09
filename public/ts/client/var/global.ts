import L from "leaflet";
import { MapCustom } from "../class/MapCustom";
import MutableNumberValue from "../interface/MutableNumberValue";
import { Modal } from "../class/Modal";
import { GenerateElement } from "../class/GenerateElement";
import SaveLayer from "../interface/SaveLayer";

export let saveLayers: SaveLayer = {};
export const MAP_CUSTOM: MapCustom = new MapCustom();
export let i: MutableNumberValue = { value: 0 };
export let controlLayers: L.Control.Layers = L.control.layers(undefined, {});
export let schemas: string[] = [];
export const MODAL: Modal = new Modal();
export const GENERATE_ELEMENT: GenerateElement = new GenerateElement();
export const URL: string = "http://localhost:3000"