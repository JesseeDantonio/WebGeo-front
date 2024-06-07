import L from 'leaflet';
import { ButtonLayer } from '../../class/ButtonLayer';
import { ButtonType } from '../../enum/ButtonType';
import { MODAL, GENERATE_ELEMENT, saveLayers, controlLayers, MAP_CUSTOM } from './../../var/global';

let handlerClickDivManage: (e: MouseEvent) => void;

const handleClick = (
    e: MouseEvent
) => {
    e.stopPropagation();
    const MANAGE: HTMLDivElement = document.body.querySelector("#modal_manage") as HTMLDivElement;

    let out: {
        closeBtn?: HTMLDivElement,
        submitBtn?: HTMLButtonElement,
        modal?: HTMLDivElement,
        card?: HTMLDivElement,
        form?: HTMLDivElement,
        buttons?: ButtonLayer[]
    } | undefined;

    out = MODAL.auto(MANAGE, () => {
        return GENERATE_ELEMENT.modalManageLayers(saveLayers);
    });


    if (out == undefined || out.buttons == undefined) {
        return;
    }

    out.buttons.forEach(element => {
        switch (element.getButtonType()) {
            
            case ButtonType.Delete:
                element.getReference().addEventListener('click', () => {
                    if (saveLayers.hasOwnProperty(element.getLayerName())) {                    
                        MAP_CUSTOM.getMap().removeLayer(saveLayers[element.getLayerName()]);
                        controlLayers.removeLayer(saveLayers[element.getLayerName()]);
                        delete saveLayers[element.getLayerName()];
                        element.getParentReference().remove();
                    }
                });
                break;
            
            case ButtonType.BringToBack:
                element.getReference().addEventListener('click', () => {
                    if (saveLayers.hasOwnProperty(element.getLayerName())) {
                        if (saveLayers[element.getLayerName()] instanceof L.GeoJSON) {
                            let test: L.GeoJSON = saveLayers[element.getLayerName()];
                            test.bringToBack();
                            out?.modal?.remove();
                        };    
                    }
                });
                break;
            
            case ButtonType.BringToFront:
                element.getReference().addEventListener('click', () => {
                    if (saveLayers.hasOwnProperty(element.getLayerName())) {
                        if (saveLayers[element.getLayerName()] instanceof L.GeoJSON) {
                            let test: L.GeoJSON = saveLayers[element.getLayerName()];
                            test.bringToFront();
                            out?.modal?.remove();
                        };    
                    }
                });
            

        
            default:
                break;
        }
    });


    out.closeBtn?.addEventListener('click', (e: MouseEvent) => handleClose(e, out));
    out.card?.addEventListener('click', (e: MouseEvent) => e.stopPropagation());
    out.modal?.addEventListener('click', (e: MouseEvent) => handleClose(e, out));

    function handleClose(e: MouseEvent, out: any) {
        e.preventDefault();
        e.stopPropagation();
        MODAL?.close(out!.modal!);
    }

}

const onClickDivManage = (
    REF_DIV_MANAGE: HTMLDivElement
) => {
    handlerClickDivManage = (e: MouseEvent) => handleClick(e)
    REF_DIV_MANAGE?.addEventListener('click', handlerClickDivManage);
};

export { onClickDivManage, handlerClickDivManage };