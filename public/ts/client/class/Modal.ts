type Callback = () => any;

export class Modal {
    REFERENCES =
        {
            CONNECT: "#modal_connect",
            IMPORT: "#modal_import",
            MANAGE: "#modal_manage",
            VIEW_ENTITY: "#modal_view_entity"
        }
        ;

    close(element: null | HTMLElement): void {
        if (element instanceof HTMLElement && element != null) {
            element.remove();
        }
    }

    isExist(element: null | HTMLElement): boolean {
        if (element instanceof HTMLElement && element != null) {
            return true;
        }
        return false;
    }

    auto(elementException: null | HTMLElement, callback: Callback): any {
        let out = undefined;

        if (!document.body) {
            console.error('Le document n’est pas encore chargé.');
            return;
        }

        const keyValueArray: [string, string][] = Object.entries(this.REFERENCES);

        for (const [key, value] of keyValueArray) {
            const MODAL: HTMLElement | null = document.body.querySelector(value);

            if (this.isExist(MODAL)) {
                this.close(MODAL);
                break;
            } else if (!this.isExist(elementException)) {
                for (const [key, value] of keyValueArray) {
                    const MODAL: HTMLElement | null = document.body.querySelector(value);
                    if (MODAL != null) {
                        this.close(MODAL);
                    }
                }
                out = callback();
                break;
            } else {
                this.close(elementException);
                break;
            }

        }
        return out;
    }
}
