import { onClickDivImport } from "../onClick/ShowDivImport";
import { handlerClickConnect } from "../onClick/ShowDivConnect";
import { GENERATE_ELEMENT } from './../../var/global';
import { onClickDivManage } from "../onClick/ShowDivManage";

let handlerSubmitConnect: (e: MouseEvent) => void;

const handleSubmit = (
    e: Event,
    REF_CONNECT: any,
    schemas: string[],
    REF_BTN_CONNECT: HTMLDivElement
) => {
    e.preventDefault();

    const HOST: string = REF_CONNECT?.inputFields[0].value;
    const PORT: string = REF_CONNECT?.inputFields[1].value;
    const DATABASE: string = REF_CONNECT?.inputFields[2].value;
    const USER: string = REF_CONNECT?.inputFields[3].value;
    const PASSWORD: string = REF_CONNECT?.inputFields[4].value;

    fetch(`/api/connect/${HOST}/${PORT}/${DATABASE}/${USER}/${PASSWORD}`)
        .then(response => {
            if (!response.ok) {
                response.json().then(data => {
                    const ERROR: string = data as string;
                    console.log(data)
                    throw new Error(data);
                });
            } else {
                return response.json();
            }
        })
        .then(data => {
            // Gérer la première réponse réussie
            return fetch('/api/schemas');
        })
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
            // Gérer la deuxième réponse réussie
            data.forEach((element: { schema_name: string }) => {
                schemas.push(element.schema_name);
            });

            const DIV_IMPORT : HTMLDivElement = GENERATE_ELEMENT.btnImport().divElement;
            const DIV_MANAGE : HTMLDivElement = GENERATE_ELEMENT.btnManageLayers().divElement;
            const DIV_FEATURE: HTMLDivElement = document.querySelector('#feature') as HTMLDivElement;

            setTimeout(() => {
                REF_CONNECT?.modal.remove();
                DIV_FEATURE.appendChild(DIV_IMPORT);
                DIV_FEATURE.appendChild(DIV_MANAGE);
                REF_BTN_CONNECT.removeEventListener('click',
                    handlerClickConnect
                );
                onClickDivImport(DIV_IMPORT, schemas);
                onClickDivManage(DIV_MANAGE)
            }, 1000);
        })
        .catch((err: Promise<any>) => {
            // Gérer les erreurs à n'importe quel niveau de la chaîne
            // A REFAIRE
            err.then((data: any) => {
                console.error(data)
            })
        });
}

const onSubmitFormConnect = (
    REF_CONNECT: any,
    schemas: string[],
    REF_BTN_CONNECT: HTMLDivElement
) => {
    handlerSubmitConnect = (e: Event) => handleSubmit(e, REF_CONNECT, schemas, REF_BTN_CONNECT);
    REF_CONNECT.modal.addEventListener('submit', handlerSubmitConnect);
};

export { onSubmitFormConnect, handlerSubmitConnect };
