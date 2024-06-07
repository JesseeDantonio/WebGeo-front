import { onClickDivConnect } from './event/onClick/ShowDivConnect';
import { onClickDivFoldDown } from './event/onClick/HideSidebar';
import { onClickDivUnfold } from './event/onClick/ShowSidebar';

// REFERENCES NOEUDS
const REF_BTN_CONNECT: HTMLDivElement = document.body.querySelector("#connect-btn") as HTMLDivElement;
const REF_BTN_FOLD_DOWN: HTMLDivElement = document.body.querySelector("#fold-down-btn") as HTMLDivElement;
const REF_SIDEBAR: HTMLDivElement = document.body.querySelector("aside") as HTMLDivElement;
const REF_BTN_UNFOLD: HTMLDivElement = document.body.querySelector("#unfold-btn") as HTMLDivElement;


onClickDivUnfold(REF_BTN_UNFOLD, REF_SIDEBAR);

onClickDivFoldDown(REF_BTN_FOLD_DOWN, REF_BTN_UNFOLD, REF_SIDEBAR);

onClickDivConnect(REF_BTN_CONNECT);
