import { ButtonType } from "../enum/ButtonType";

export abstract class Button {
    private buttonType: ButtonType;
    private reference: HTMLElement;
    private parentReference: HTMLElement;

    constructor(buttonType: ButtonType, reference: HTMLElement, parentReference: HTMLElement) {
        this.buttonType = buttonType;
        this.reference = reference;
        this.parentReference = parentReference;
    }

    public getButtonType() {
        return this.buttonType;
    }

    public getReference() {
        return this.reference;
    }

    public getParentReference() {
        return this.parentReference;
    }
}