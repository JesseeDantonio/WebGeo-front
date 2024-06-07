import * as L from 'leaflet';
import { GeometryType } from "../../enum/GeometryType";
import { MAP_CUSTOM, MODAL, GENERATE_ELEMENT, saveLayers, controlLayers } from './../../var/global';
import { MapCustom } from '../../class/MapCustom';

let handlerSubmitImport: (e: SubmitEvent) => void;

const handleSubmit = (
    e: SubmitEvent,
    REF_IMPORT: any
) => {
    e.preventDefault();

    if (
        isEmpty(REF_IMPORT.selectSchema.options[REF_IMPORT.selectSchema.selectedIndex]?.value) ||
        isEmpty(REF_IMPORT.selectTable.options[REF_IMPORT.selectTable.selectedIndex]?.value)
    ) {
        return;
    }

    const SELECTED_SCHEMA: string = REF_IMPORT.selectSchema.options[REF_IMPORT.selectSchema.selectedIndex].value;
    const SELECTED_TABLE: string = REF_IMPORT.selectTable.options[REF_IMPORT.selectTable.selectedIndex].value;
    const SELECTED_TYPE: string = REF_IMPORT.selectType.options[REF_IMPORT.selectType.selectedIndex].value;
    const SELECTED_COLOR: string = REF_IMPORT.inputColor.value;
    const SELECTED_SIZE: number = REF_IMPORT.inputSize.value;

    let layer: L.GeoJSON | null = null


    fetch(`/api/entity/${SELECTED_SCHEMA}/${SELECTED_TABLE}`)
        .then(response => {
            if (!response.ok) {
                response.json().then(data => {
                    const ERROR: string = data as string;
                    throw new Error(ERROR);
                });
            } else {
                return response.json();
            }
        })
        .then((data: object) => {
            let geojsonFeatures: any[] = [];

            switch (SELECTED_TYPE) {
                case GeometryType.Point:
                    layer = createLayerPoint(
                        data, MAP_CUSTOM, geojsonFeatures,
                        SELECTED_SCHEMA, SELECTED_TABLE, SELECTED_COLOR, SELECTED_SIZE
                    );
                    break;
                case GeometryType.MultiLineString:
                    layer = createLayerMultiLineString(
                        data, MAP_CUSTOM, geojsonFeatures,
                        SELECTED_SCHEMA, SELECTED_TABLE, SELECTED_COLOR, SELECTED_SIZE
                    );
                    break;
                case GeometryType.MultiPolygon:
                    layer = createLayerMultiPolygon(
                        data, MAP_CUSTOM, geojsonFeatures,
                        SELECTED_SCHEMA, SELECTED_TABLE, SELECTED_COLOR
                    );
                    break;
                case 'Automatique':
                    const FIRST_ELEM = JSON.parse(Object.values(data)[0].st_asgeojson);
                    const TYPE_AUTO = FIRST_ELEM.type;
                    switch (TYPE_AUTO) {
                        case GeometryType.Point:
                            layer = createLayerPoint(
                                data, MAP_CUSTOM, geojsonFeatures,
                                SELECTED_SCHEMA, SELECTED_TABLE, SELECTED_COLOR, SELECTED_SIZE
                            );
                            break;
                        case GeometryType.MultiLineString:
                            layer = createLayerMultiLineString(
                                data, MAP_CUSTOM, geojsonFeatures,
                                SELECTED_SCHEMA, SELECTED_TABLE, SELECTED_COLOR, SELECTED_SIZE
                            );
                            break
                        case GeometryType.MultiPolygon:
                            layer = createLayerMultiPolygon(
                                data, MAP_CUSTOM, geojsonFeatures,
                                SELECTED_SCHEMA, SELECTED_TABLE, SELECTED_COLOR
                            );
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }

            if (layer) {
                const geoJSONLayer = layer as L.GeoJSON;
                geoJSONLayer.on('click', (e: L.LeafletMouseEvent) => {
                    fetch(`/api/entity/${SELECTED_SCHEMA}/${SELECTED_TABLE}/${e.propagatedFrom.feature.properties.id}`)
                        .then(response => {
                            if (!response.ok) {
                                response.json().then(data => {
                                    const ERROR: string = data as string;
                                    throw new Error(ERROR);
                                });
                            } else {
                                return response.json();
                            }
                        })
                        .then(data => {
                            let out: {
                                closeBtn?: HTMLButtonElement,
                                submitBtn?: HTMLButtonElement,
                                modal?: HTMLDivElement,
                                card?: HTMLDivElement,
                                container?: HTMLDivElement,
                                fields?: HTMLDivElement[]
                            } | undefined;


                            out = GENERATE_ELEMENT.modalViewEntity(data[0], e);

                            out?.closeBtn?.addEventListener('click', (e: MouseEvent) => handleClose(e, out));
                            out?.modal?.addEventListener('click', (e: MouseEvent) => handleClose(e, out));
                            out?.card?.addEventListener('click', (e: MouseEvent) => e.stopPropagation());
                            out?.submitBtn?.addEventListener('click', (e: MouseEvent) => e.preventDefault());

                            function handleClose(e: MouseEvent, out: any) {
                                e.preventDefault();
                                e.stopPropagation();
                                out?.modal?.classList.add("opacity-0", "transition-opacity");
                                setTimeout(() => {
                                    MODAL?.close(out!.modal!);
                                }, 1000);
                            }
                        })

                });

                // MAP_CUSTOM.getMap().removeControl(controlLayers);
                // controlLayers.remove();


                if (!(saveLayers.hasOwnProperty(SELECTED_SCHEMA + " - " + SELECTED_TABLE))) {
                    if (layer != null) {
                        if (!(MAP_CUSTOM.getMap().hasLayer(layer))) {
                            controlLayers.addOverlay(layer, SELECTED_SCHEMA + " - " + SELECTED_TABLE).addTo(MAP_CUSTOM.getMap());
                            // Activation de la couche ajoutée
                            MAP_CUSTOM.getMap().addLayer(layer);
    
                            MODAL.close(REF_IMPORT.modal);
    
                            MAP_CUSTOM.getMap().fitBounds(layer.getBounds());
                            saveLayers[SELECTED_SCHEMA + " - " + SELECTED_TABLE] = layer;
                        }
                    }

                }
            }

        })
        .catch(err => {
            console.error(err);
        });



}

function createLayerMultiPolygon(
    data: any, MAP_CUSTOM: MapCustom, geojsonFeatures: any[], SELECTED_SCHEMA: string,
    SELECTED_TABLE: string, SELECTED_COLOR: string
) {
    data.forEach((element: any) => {
        const st_asgeojson = JSON.parse(element.st_asgeojson);

        if (st_asgeojson == null) {
            return;
        }

        const polygonArr: any[] = [];

        st_asgeojson.coordinates.forEach((polygon: any) => {
            const ringArr: any[] = [];

            // Parcourez chaque anneau (extérieur et intérieurs) du polygone
            polygon.forEach((ring: any) => {
                // Parcourez chaque paire de coordonnées dans l'anneau
                ring.forEach((coordinate: any) => {
                    const latitude = coordinate[0]; // Latitude
                    const longitude = coordinate[1]; // Longitude
                    const COORDINATES = MAP_CUSTOM.getConvert().unproject(new L.Point(latitude, longitude));
                    ringArr.push([COORDINATES.lng, COORDINATES.lat]);
                });
            });

            // Ajoutez l'anneau actuel au tableau des anneaux du polygone
            polygonArr.push([ringArr]);
        });

        // Ajoutez le polygone actuel à geojsonFeatures
        geojsonFeatures.push({
            type: "Feature",
            geometry: {
                type: st_asgeojson.type,
                coordinates: polygonArr,
            },
            properties: {
                schema: SELECTED_SCHEMA,
                table: SELECTED_TABLE,
                id: element.id,
                name: st_asgeojson.crs.properties.name,
            },
        });

    });

    // Construisez un objet GeoJSON valide
    const geojsonFeatureCollection: any = {
        type: "FeatureCollection",
        features: geojsonFeatures,
    };

    return L.geoJSON(geojsonFeatureCollection, {
        style: {
            color: SELECTED_COLOR,
            renderer: MAP_CUSTOM.getRenderer()
        },
    });
}

function createLayerMultiLineString(
    data: any, MAP_CUSTOM: MapCustom, geojsonFeatures: any[], SELECTED_SCHEMA: string,
    SELECTED_TABLE: string, SELECTED_COLOR: string, SELECTED_SIZE: number
) {
    data.forEach((element: any) => {
        const st_asgeojson = JSON.parse(element.st_asgeojson);

        if (st_asgeojson == null) {
            return;
        }

        const lineArr: any[] = [];

        st_asgeojson.coordinates.forEach((line: any) => {
            // Parcourez chaque paire de coordonnées dans la ligne
            line.forEach((coordinate: any) => {
                const latitude = coordinate[0]; // Latitude
                const longitude = coordinate[1]; // Longitude
                const COORDINATES = MAP_CUSTOM.getConvert().unproject(new L.Point(latitude, longitude));
                lineArr.push([COORDINATES.lng, COORDINATES.lat]);
            });
        });

        // Ajoutez la ligne actuelle à geojsonFeatures
        geojsonFeatures.push({
            type: "Feature",
            geometry: {
                type: st_asgeojson.type,
                coordinates: [lineArr], // Mettez le tableau de coordonnées ici
            },
            properties: {
                schema: SELECTED_SCHEMA,
                table: SELECTED_TABLE,
                id: element.id,
                name: st_asgeojson.crs.properties.name,
            },
        });
    });



    // Construisez un objet GeoJSON valide
    const geojsonFeatureCollection: any = {
        type: "FeatureCollection",
        features: geojsonFeatures,
    };

    //Créez une couche GeoJSON avec Leaflet
    return L.geoJSON(geojsonFeatureCollection, {
        style: {
            color: SELECTED_COLOR,
            weight: SELECTED_SIZE,
            renderer: MAP_CUSTOM.getRenderer()
        },
    });
}

function createLayerPoint(
    data: any, MAP_CUSTOM: MapCustom, geojsonFeatures: any[], SELECTED_SCHEMA: string,
    SELECTED_TABLE: string, SELECTED_COLOR: string, SELECTED_SIZE: number
) {
    data.forEach((element: any) => {
        const st_asgeojson = JSON.parse(element.st_asgeojson);

        if (st_asgeojson == null) {
            return;
        }

        /* Degrees to metres   */
        const COORDINATES: L.LatLng = MAP_CUSTOM.getConvert().unproject(new L.Point(st_asgeojson.coordinates[0], st_asgeojson.coordinates[1]));

        geojsonFeatures.push({
            type: "Feature",
            geometry: {
                type: st_asgeojson.type,
                coordinates: [COORDINATES.lat, COORDINATES.lng],
            },
            properties: {
                schema: SELECTED_SCHEMA,
                table: SELECTED_TABLE,
                id: element.id,
                name: st_asgeojson.crs.properties.name,
            },
        });

    });

    // Construisez un objet GeoJSON valide
    const geojsonFeature: any = {
        type: "Feature",
        features: geojsonFeatures,
    };


    return L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature: any, latlng: any) {
            // Créez et retournez un cercle avec le rayon approprié
            return L.circle(
                feature.geometry.coordinates,
                {
                    color: SELECTED_COLOR,
                    renderer: MAP_CUSTOM.getRenderer(),
                    radius: SELECTED_SIZE, // Définissez le rayon du cercle
                });
        }
    });
}


const onSubmitFormImport = (
    REF_IMPORT: any
) => {
    handlerSubmitImport = (e: SubmitEvent) => handleSubmit(e, REF_IMPORT);
    REF_IMPORT.modal.addEventListener('submit',
        handlerSubmitImport
    );
}

function isEmpty(str: string) {
    return str.trim().length === 0;
}

export { onSubmitFormImport, handlerSubmitImport };



