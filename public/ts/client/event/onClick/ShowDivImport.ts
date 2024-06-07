import { onChangeSelectRecipe } from "../onChange/SelectRecipe";
import { onSubmitFormImport } from "../onSubmit/FormImport";
import { MODAL, GENERATE_ELEMENT } from './../../var/global';

let handlerClickImport: (e: MouseEvent) => void;

const handleClick = (
    e: MouseEvent,
    REF_ARR: string[]
) => {
    e.stopPropagation();
    const IMPORT: HTMLDivElement = document.body.querySelector("#modal_import") as HTMLDivElement;
    
    let out: {
        closeBtn?: HTMLButtonElement,
        submitBtn?: HTMLButtonElement,
        modal?: HTMLDivElement,
        card?: HTMLDivElement,
        form?: HTMLFormElement,
        labelSchema?: HTMLLabelElement,
        labelTable?: HTMLLabelElement,
        labelColor?: HTMLLabelElement,
        labelType?: HTMLLabelElement,
        selectSchema?: HTMLSelectElement,
        selectTable?: HTMLSelectElement,
        selectType?: HTMLSelectElement,
        inputColor?: HTMLInputElement
    } | undefined;

    out = MODAL.auto(IMPORT, () => {
        return GENERATE_ELEMENT.modalImport(REF_ARR)
    })

    if (out == undefined) {
        return
    }

    onSubmitFormImport(out!);
    onChangeSelectRecipe(out!.selectSchema!, out!.selectTable!);


    out?.closeBtn?.addEventListener('click', (e: MouseEvent) => handleClose(e, out));

    out?.modal?.addEventListener('click', (e: MouseEvent) => handleClose(e, out));
    // Empêcher la fermeture de la modal ( fermeture si click hors modal )
    out?.card?.addEventListener('click', (e: MouseEvent) => e.stopPropagation());
    // Empêcher l'ouverture de l'input Color
    out?.labelColor?.addEventListener('click', (e: MouseEvent) => e.preventDefault());
    // Empêcher l'ouverture de select Schema
    out?.labelSchema?.addEventListener('click', (e: MouseEvent) => e.preventDefault());
    // Empêcher l'ouverture de select Table
    out?.labelTable?.addEventListener('click', (e: MouseEvent) => e.preventDefault());
    // Empêcher l'ouverture de select Type
    out?.labelType?.addEventListener('click', (e: MouseEvent) => e.preventDefault());

    function handleClose(e: MouseEvent, out: any) {
        e.preventDefault();
        e.stopPropagation();
        MODAL?.close(out!.modal!);
    }
}

const onClickDivImport = (
    REF_BTN_IMPORT: HTMLDivElement,
    REF_ARR: string[]
) => {
    handlerClickImport = (e: MouseEvent) => handleClick(e, REF_ARR);
    REF_BTN_IMPORT?.addEventListener('click',
        handlerClickImport
    );
};

export { onClickDivImport, handlerClickImport };