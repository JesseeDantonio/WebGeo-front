let handlerClickDivFoldDown: (e: MouseEvent) => void;

const handleClick = (
    e: MouseEvent,
    REF_BTN_UNFOLD: HTMLDivElement,
    REF_ASIDE: HTMLElement
) => {
    e.stopPropagation();
    REF_ASIDE.classList.replace("w-16", "w-0");
    REF_BTN_UNFOLD.classList.remove("hidden");
}


const onClickDivFoldDown = (
    REF_BTN_FOLD_DOWN: HTMLDivElement,
    REF_BTN_UNFOLD: HTMLDivElement,
    REF_ASIDE: HTMLElement
) => {
    handlerClickDivFoldDown = (e: MouseEvent) => handleClick(e,  REF_BTN_UNFOLD, REF_ASIDE);
    REF_BTN_FOLD_DOWN?.addEventListener('click', handlerClickDivFoldDown);
};


export { onClickDivFoldDown, handlerClickDivFoldDown };