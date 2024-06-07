import { Modal } from "../../class/Modal";
import { onSubmitFormConnect } from "../onSubmit/FormConnect";
import { schemas, MODAL, GENERATE_ELEMENT } from './../../var/global';


let handlerClickConnect: (e: MouseEvent) => void;

const handleClick = (
    e: MouseEvent,
    REF_BTN_CONNECT: HTMLDivElement
) => {
    e.stopPropagation();
    const CONNECT: HTMLDivElement = document.body.querySelector("#modal_connect") as HTMLDivElement;
    let out: {
        closeBtn?: HTMLDivElement,
        submitBtn?: HTMLButtonElement,
        modal?: HTMLDivElement,
        card?: HTMLDivElement,
        form?: HTMLFormElement,
        inputFields?: HTMLInputElement[]
    } | undefined;

    out = MODAL.auto(CONNECT, () => {
        return GENERATE_ELEMENT.modalConnect()
    })

    if (out == undefined) {
        return
    }


    onSubmitFormConnect(
        out!,
        schemas,
        REF_BTN_CONNECT
    );

    out?.closeBtn?.addEventListener('click', (e: MouseEvent) => handleClose(e, MODAL, out));
    out?.modal?.addEventListener('click', (e: MouseEvent) => handleClose(e, MODAL, out));
    out?.card?.addEventListener('click', (e: MouseEvent) => e.stopPropagation());

    function handleClose(e: MouseEvent, MODAL: Modal, out: any) {
        e.preventDefault();
        e.stopPropagation();
        MODAL?.close(out!.modal!);
    }
};

const onClickDivConnect = (
    REF_BTN_CONNECT: HTMLDivElement
) => {
    handlerClickConnect = (e: MouseEvent) => handleClick(e, REF_BTN_CONNECT);
    REF_BTN_CONNECT.addEventListener('click', handlerClickConnect);
};

export { onClickDivConnect, handlerClickConnect };
