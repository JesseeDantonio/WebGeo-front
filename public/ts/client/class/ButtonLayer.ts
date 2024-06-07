import { Button } from "../abstract/Button";
import { ButtonType } from "../enum/ButtonType";

export class ButtonLayer extends Button {
    private layerName: string;

    constructor(layerName: string, buttonType: ButtonType, reference: HTMLElement, parentReference: HTMLElement) {
        super(
            buttonType,
            reference,
            parentReference
        );
        this.layerName = layerName;
    }

    public getLayerName() : string{
        return this.layerName;
    }
}