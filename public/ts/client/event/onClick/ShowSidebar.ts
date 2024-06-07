let handlerClickBtnUnfold: (e: MouseEvent) => void;

const handleClick = (
    e: MouseEvent,
    REF_BTN_UNFOLD: HTMLDivElement,
    REF_ASIDE: HTMLElement,
) => {
    e.stopPropagation();
    REF_ASIDE.classList.replace("w-0", "w-16");
    REF_BTN_UNFOLD.classList.add("hidden");
}

const onClickDivUnfold = (
    REF_BTN_UNFOLD: HTMLDivElement,
    REF_ASIDE: HTMLElement,
) => {
    handlerClickBtnUnfold = (e: MouseEvent) => handleClick(e, REF_BTN_UNFOLD, REF_ASIDE)
    REF_BTN_UNFOLD?.addEventListener('click', handlerClickBtnUnfold);
};

export { onClickDivUnfold, handlerClickBtnUnfold };