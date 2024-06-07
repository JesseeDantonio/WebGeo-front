import { ButtonType } from "../enum/ButtonType";
import saveLayer from "../interface/SaveLayer";
import { ButtonLayer } from "./ButtonLayer";

export class GenerateElement {
    getRandomHexColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]; // Sélectionne aléatoirement un caractère hexadécimal
        }
        return color;
    }
    // Fonction pour créer un élément avec des classes et du texte
    createElementWithClasses(tag: string, classes: string, text: string = ""): HTMLElement {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (text) element.textContent = text;
        return element;
    }

    modalImport(REF_ARR: string[]): {
        "closeBtn": HTMLDivElement,
        "submitBtn": HTMLButtonElement,
        "modal": HTMLDivElement,
        "card": HTMLDivElement,
        "form": HTMLFormElement,
        "labelColor": HTMLLabelElement,
        "labelSchema": HTMLLabelElement,
        "labelTable": HTMLLabelElement,
        "labelType": HTMLLabelElement,
        "selectSchema": HTMLSelectElement,
        "selectTable": HTMLSelectElement,
        "selectType": HTMLSelectElement,
        "inputColor": HTMLInputElement,
        "inputSize": HTMLInputElement
    } {
        // Création de la div principale
        const modal: HTMLDivElement = this.createElementWithClasses('div', 'absolute left-0 top-0 flex h-full w-full items-center justify-center z-[810] p-2') as HTMLDivElement;
        modal.id = 'modal_import';

        // Création de la div interne
        const card = this.createElementWithClasses('div', 'max-h-full w-full max-w-xl overflow-y-auto rounded-2xl bg-gray-800 p-2') as HTMLDivElement;
        card.id = 'card';

        // Création des éléments à l'intérieur de la div interne
        const innerDiv = this.createElementWithClasses('div', 'w-full flex justify-center');
        const innerDiv2 = this.createElementWithClasses('div', 'max-w-[600px] w-full');
        const heading = this.createElementWithClasses('h3', 'mb-4 text-3xl font-extrabold text-center text-white', 'Importation');
        const paragraph = this.createElementWithClasses("p", "text-gray-200 mb-12 text-center text-white", "Importer des couches de données");
        

        // Formulaire avec les éléments à l'intérieur
        const form: HTMLFormElement = this.createElementWithClasses('form', "flex flex-col") as HTMLFormElement;
        form.id = 'form-import';
        form.action = '';

        const labelSchema: HTMLLabelElement = this.createElementWithClasses('label', 'mb-2 font-medium text-white text-lg', 'Sélectionnez un schéma :') as HTMLLabelElement;
        labelSchema.htmlFor = 'selectSchema';

        const selectSchema: HTMLSelectElement = this.createElementWithClasses('select', 'mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500') as HTMLSelectElement;
        selectSchema.id = 'selectSchema';

        const labelTable: HTMLLabelElement = this.createElementWithClasses('label', 'mb-2 font-medium text-white text-lg', 'Sélectionnez une table :') as HTMLLabelElement;
        labelTable.htmlFor = 'selectTable';

        const labelColor: HTMLLabelElement = this.createElementWithClasses('label', 'mb-2 font-medium text-white text-lg', 'Sélectionnez une couleur :') as HTMLLabelElement;
        labelColor.htmlFor = 'selectColor';

        const selectTable: HTMLSelectElement = this.createElementWithClasses('select', 'mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500') as HTMLSelectElement;
        selectTable.id = 'selectTable';
        //selectTable.disabled = true;

        const labelType: HTMLLabelElement = this.createElementWithClasses('label', 'mb-2 font-medium text-white text-lg', 'Sélectionnez un type de géométrie :') as HTMLLabelElement;
        labelType.htmlFor = 'selectType';

        const selectType: HTMLSelectElement = this.createElementWithClasses('select', 'mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500') as HTMLSelectElement;
        selectType.id = 'selectType';

        const labelSize: HTMLLabelElement = this.createElementWithClasses('label', 'mb-2 font-medium text-white text-lg', 'Sélectionnez une taille :') as HTMLLabelElement;
        labelSize.htmlFor = 'selectSize';

        const inputSize: HTMLInputElement = this.createElementWithClasses('input', 'mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500') as HTMLInputElement;
        inputSize.id = 'inputSize';
        inputSize.type = 'number';
        inputSize.min = '1';
        inputSize.max = '10';
        inputSize.value = '2';

        const optionSchema = document.createElement('option');
        selectSchema.appendChild(optionSchema);

        const optionTable = document.createElement('option');
        selectTable.appendChild(optionTable);

        const optionTypeAuto = document.createElement('option');
        optionTypeAuto.text = 'Automatique';
        selectType.appendChild(optionTypeAuto);

        const optionTypePoint = document.createElement("option");
        optionTypePoint.text = 'Point';
        selectType.appendChild(optionTypePoint);

        const optionTypeMultiLine = document.createElement("option");
        optionTypeMultiLine.text = 'MultiLineString';
        selectType.appendChild(optionTypeMultiLine);

        const optionPolygon = document.createElement('option');
        optionPolygon.text = 'MultiPolygon';
        selectType.appendChild(optionPolygon);

        const inputColor: HTMLInputElement = this.createElementWithClasses('input', 'mb-2 w-full') as HTMLInputElement;
        inputColor.id = 'selectColor';
        inputColor.type = 'color';
        inputColor.value = this.getRandomHexColor();

        const submitBtn: HTMLButtonElement = this.createElementWithClasses("button", "mb-1 p-2 bg-blue-700 w-full rounded font-semibold hover:bg-blue-800 text-white border-none", "Importer") as HTMLButtonElement;
        submitBtn.type = "submit";

        const OPTIONS: HTMLDivElement = document.createElement("div");
        OPTIONS.setAttribute("class", "w-full h-7 flex justify-end mb-6");

        const closeBtn: HTMLDivElement = document.createElement("div");
        closeBtn.setAttribute("title", "Fermer la fenêtre");
        closeBtn.setAttribute("class", "btn h-7 w-7 hover:bg-gray-600 rounded");
        closeBtn.style.backgroundImage = "url('icons/close-svgrepo-com.svg')";

        const svg = document.createElement("svg");
        svg.setAttribute("class", "w-3 h-3");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 14 14");

        const path = document.createElement("path");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("d", "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6");

        svg.appendChild(path);

        closeBtn.appendChild(svg);

        OPTIONS.appendChild(closeBtn)

        // Ajout des éléments au DOM
        modal.appendChild(card);
        card.appendChild(innerDiv);
        innerDiv.appendChild(innerDiv2);
        innerDiv2.appendChild(OPTIONS);
        innerDiv2.appendChild(heading);
        innerDiv2.appendChild(paragraph);
        innerDiv2.appendChild(form);
        form.appendChild(labelSchema);
        form.appendChild(selectSchema);

        for (let index = 0; index < REF_ARR.length; index++) {
            const element = REF_ARR[index];
            const OPTION = document.createElement('option');
            OPTION.textContent = element;
            OPTION.value = element;
            selectSchema?.appendChild(OPTION);
        }
        form.appendChild(labelTable);
        form.appendChild(selectTable);
        form.appendChild(labelType);
        form.appendChild(selectType);
        form.appendChild(labelColor);
        form.appendChild(inputColor);
        form.appendChild(labelSize);
        form.appendChild(inputSize);

        form.appendChild(submitBtn);

        // ... (continue d'ajouter les éléments au formulaire)
        const REF_MAIN = document.body.querySelector("main");
        // Ajout du modal au body
        REF_MAIN!.insertBefore(modal, REF_MAIN!.firstChild);

        return {
            "closeBtn": closeBtn,
            "submitBtn": submitBtn,
            "modal": modal,
            "card": card,
            "form": form,
            "labelColor": labelColor,
            "labelSchema": labelSchema,
            "labelTable": labelTable,
            "labelType": labelType,
            "selectSchema": selectSchema,
            "selectTable": selectTable,
            "selectType": selectType,
            "inputColor": inputColor,
            "inputSize": inputSize
        };
    }

    modalConnect(): {
        "closeBtn": HTMLDivElement,
        "submitBtn": HTMLButtonElement,
        "modal": HTMLDivElement,
        "card": HTMLDivElement,
        "form": HTMLFormElement,
        "inputFields": HTMLInputElement[]
    } {
        // Création du modal
        const modal = this.createElementWithClasses("div", "absolute left-0 top-0 flex h-full w-full items-center justify-center z-[810] p-2") as HTMLDivElement;
        modal.id = "modal_connect";

        // Création de la carte (card) à l'intérieur du modal
        const card = this.createElementWithClasses("div", "max-h-full w-full max-w-xl overflow-y-auto rounded-2xl bg-gray-800 p-2") as HTMLDivElement;
        card.id = "card";

        // Contenu de la carte
        const content = this.createElementWithClasses("div", "w-full flex justify-center");
        const innerContent = this.createElementWithClasses("div", "max-w-[600px] w-full");

        // Titre et paragraphe
        const title = this.createElementWithClasses("h3", "mb-4 text-3xl font-extrabold text-center text-white w-full", "Connexion");
        const paragraph = this.createElementWithClasses("p", "text-gray-400 mb-12 text-center text-white", "Connexion à une base de données PostgreSQL.");

        // Formulaire avec champs et bouton
        const form: HTMLFormElement = this.createElementWithClasses("form", "flex flex-col", "") as HTMLFormElement;
        form.id = "form-confidentials";
        form.action = "";

        const inputFields = ["HOST", "PORT", "DATABASE", "USER", "PASSWORD"].map(name => {
            const input: HTMLInputElement = this.createElementWithClasses("input", "mb-2 w-full rounded-full p-2 focus:ring-4 focus:ring-white text-white", "") as HTMLInputElement;
            input.type = (name === "PASSWORD") ? "password" : "text";
            input.name = name.toLowerCase();
            input.classList.add("bg-gray-700");
            input.placeholder = name;
            input.required = true;
            return input;
        });

        const submitBtn: HTMLButtonElement = this.createElementWithClasses("button", "mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800", "Connexion") as HTMLButtonElement;
        submitBtn.type = "submit";

        const OPTIONS: HTMLDivElement = document.createElement("div");
        OPTIONS.setAttribute("class", "w-full h-7 flex justify-end mb-6");

        const closeBtn: HTMLDivElement = document.createElement("div");
        closeBtn.setAttribute("title", "Fermer la fenêtre");
        closeBtn.setAttribute("class", "btn h-7 w-7 hover:bg-gray-600 rounded");
        closeBtn.style.backgroundImage = "url('icons/close-svgrepo-com.svg')";

        const svg = document.createElement("svg");
        svg.setAttribute("class", "w-3 h-3");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 14 14");

        const path = document.createElement("path");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("d", "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6");

        svg.appendChild(path);

        closeBtn.appendChild(svg);

        // Ajout des éléments au DOM
        const REF_MAIN = document.body.querySelector("main");
        // Ajout du modal au body
        REF_MAIN!.insertBefore(modal, REF_MAIN!.firstChild);
        modal.appendChild(card);
        card.appendChild(content);
        OPTIONS.appendChild(closeBtn)
        innerContent.appendChild(OPTIONS)
        content.appendChild(innerContent);
        innerContent.appendChild(title);
        innerContent.appendChild(paragraph);
        innerContent.appendChild(form);

        inputFields.forEach(input => form.appendChild(input));
        form.appendChild(submitBtn);

        return {
            "closeBtn": closeBtn,
            "submitBtn": submitBtn,
            "modal": modal,
            "card": card,
            "form": form,
            "inputFields": inputFields
        };
    }

    btnImport(): { "divElement": HTMLDivElement } {
        // Créer l'élément div
        let divElement = document.createElement("div");
        divElement.setAttribute("title", "Importer des couches de données");
        divElement.setAttribute("id", "add-btn");
        divElement.setAttribute("class", "btn-aside h-12");
        divElement.style.backgroundImage = "url('icons/add-svgrepo-com.svg')";



        return { "divElement": divElement };
    }

    btnManageLayers(): { "divElement": HTMLDivElement } {
        // Créer l'élément div
        let divElement = document.createElement("div");
        divElement.setAttribute("title", "Gestion des couches de données");
        divElement.setAttribute("id", "manage-btn");
        divElement.setAttribute("class", "btn-aside h-12");
        divElement.style.backgroundImage = "url('icons/layer-group-svgrepo-com.svg')";

        return { "divElement": divElement };
    }

    modalViewEntity(DATA: object, e: L.LeafletMouseEvent): {
        "closeBtn": HTMLButtonElement,
        "submitBtn": HTMLButtonElement,
        "modal": HTMLDivElement,
        "card": HTMLDivElement,
        "container": HTMLDivElement,
        "fields": HTMLDivElement[]
    } {
        // Création du modal
        const modal = this.createElementWithClasses("div", "absolute left-0 top-0 flex h-full w-full items-center justify-center z-[810] p-2") as HTMLDivElement;
        modal.id = "modal_view_entity";

        // Création de la carte (card) à l'intérieur du modal
        const card = this.createElementWithClasses("div", "max-h-full w-full max-w-xl overflow-scroll rounded-2xl bg-gray-800 p-2") as HTMLDivElement;
        card.id = "card";

        // Contenu de la carte
        const content = this.createElementWithClasses("div", "w-full flex justify-center");
        const innerContent = this.createElementWithClasses("div", "max-w-[600px] w-full");

        // Titre et paragraphe
        const title = this.createElementWithClasses("h3", "mb-4 text-3xl font-extrabold text-center text-white w-full", "Visualisation");
        const paragraph = this.createElementWithClasses("p", "text-gray-200 mb-12 text-center text-white", `${e.propagatedFrom.feature.properties.schema} - ${e.propagatedFrom.feature.properties.table}`);

        const container: HTMLDivElement = this.createElementWithClasses("div", "overflow-scroll", "") as HTMLDivElement;
        container.id = "div-confidentials";

        const fields = Object.entries(DATA).map(([name, value]: [string, any]) => {
            const div_container: HTMLDivElement = this.createElementWithClasses("div", "flex bg-gray-700 mb-2 w-full p-2 focus:ring-4 focus:ring-white text-white ", "") as HTMLDivElement;
            const div_key: HTMLDivElement = this.createElementWithClasses('div', "w-full p-2 focus:ring-4 focus:ring-white text-white", name) as HTMLDivElement;
            const input_value: HTMLInputElement = this.createElementWithClasses('input', "bg-gray-700 w-full p-2 focus:ring-4 focus:ring-white text-white", "") as HTMLInputElement;
            input_value.value = value;
            input_value.dataset.field = name;
            input_value.disabled = true;

            div_container.appendChild(div_key);
            div_container.appendChild(input_value);

            return div_container;
        });


        const submitBtn: HTMLButtonElement = this.createElementWithClasses("button", "mb-1 mt-1 p-2 bg-gray-600 rounded-full w-full font-semibold hover:bg-gray-700 text-white border-none", "Mode édition") as HTMLButtonElement;
        submitBtn.type = "submit";

        const closeBtn: HTMLButtonElement = this.createElementWithClasses("button", "close p-2 bg-red-600 rounded-full w-full font-semibold hover:bg-red-700 text-white border-none", "Fermer") as HTMLButtonElement;

        // Ajout des éléments au DOM
        const REF_MAIN = document.body.querySelector("main");
        // Ajout du modal au body
        REF_MAIN!.insertBefore(modal, REF_MAIN!.firstChild);
        modal.appendChild(card);
        card.appendChild(content);
        content.appendChild(innerContent);
        innerContent.appendChild(title);
        innerContent.appendChild(paragraph);
        innerContent.appendChild(container);

        fields.forEach((div) => container.appendChild(div));
        card.appendChild(submitBtn);
        card.appendChild(closeBtn);


        return {
            "closeBtn": closeBtn,
            "submitBtn": submitBtn,
            "modal": modal,
            "card": card,
            "container": container,
            "fields": fields
        };
    }

    modalManageLayers(saveLayers: saveLayer): {
        "closeBtn": HTMLDivElement,
        "modal": HTMLDivElement,
        "card": HTMLDivElement,
        "container": HTMLDivElement,
        "buttons": ButtonLayer[]
    } {
        // Création du modal
        const modal = this.createElementWithClasses("div", "absolute left-0 top-0 flex h-full w-full items-center justify-center z-[810] p-2") as HTMLDivElement;
        modal.id = "modal_manage";

        // Création de la carte (card) à l'intérieur du modal
        const card = this.createElementWithClasses("div", "max-h-full w-full max-w-xl overflow-y-auto rounded-2xl bg-gray-800 p-2") as HTMLDivElement;
        card.id = "card";

        // Contenu de la carte
        const content = this.createElementWithClasses("div", "w-full flex justify-center");
        const innerContent = this.createElementWithClasses("div", "max-w-[600px] w-full");

        // Titre et paragraphe
        const title = this.createElementWithClasses("h3", "mb-4 text-3xl font-extrabold text-center text-white w-full", "Gestion");
        const paragraph = this.createElementWithClasses("p", "text-gray-400 mb-12 text-center text-white", "Gestion des couches de données.");

        // Formulaire avec champs et bouton
        const container: HTMLDivElement = this.createElementWithClasses("div", "flex flex-col", "") as HTMLDivElement;
        container.id = "form-confidentials";

        const keyValueArray: [string, L.Layer][] = Object.entries(saveLayers);
        let buttonsLayer: ButtonLayer[] = [];

        const divFields = keyValueArray.map(([key, value]) => {
            const div: HTMLDivElement = this.createElementWithClasses("div", "flex h-14 bg-gray-700 mb-2 text-white rounded", "") as HTMLDivElement;
            div.setAttribute("data-layer-name", key.toLowerCase());

            const divFirstPart: HTMLDivElement = this.createElementWithClasses("div", "h-full py-5 text-white text-xs w-full text-center", "") as HTMLDivElement;
            const spanNameLayer: HTMLSpanElement = this.createElementWithClasses("span", "", key.toLowerCase()) as HTMLSpanElement;

            divFirstPart.appendChild(spanNameLayer);

            const divSecondPart: HTMLDivElement = this.createElementWithClasses("div", "flex h-full p-1 text-white w-full justify-end", "") as HTMLDivElement;


            const divDelete: HTMLDivElement = this.createElementWithClasses("div", "cursor-pointer px-2 mx-1 py-4 bg-blue-700 hover:bg-blue-800 text-white text-xs rounded h-auto", "") as HTMLDivElement;
            const spanDelete: HTMLSpanElement = this.createElementWithClasses("span", "", "Supprimer") as HTMLSpanElement;

            const divBringToFront: HTMLDivElement = this.createElementWithClasses("div", "cursor-pointer px-2 mx-1 py-4 bg-blue-700 hover:bg-blue-800 text-white text-xs rounded h-auto", "") as HTMLDivElement;
            const spanBringToFront: HTMLSpanElement = this.createElementWithClasses("span", "", "Monter") as HTMLSpanElement;

            const divBringToBack: HTMLDivElement = this.createElementWithClasses("div", "cursor-pointer px-2 mx-1 py-4 bg-blue-700 hover:bg-blue-800 text-white text-xs rounded h-auto", "") as HTMLDivElement;
            const spanBringToBack: HTMLSpanElement = this.createElementWithClasses("span", "", "Descendre") as HTMLSpanElement;

            divDelete.appendChild(spanDelete);
            divSecondPart.appendChild(divDelete);

            divBringToFront.appendChild(spanBringToFront);
            divSecondPart.appendChild(divBringToFront);

            divBringToBack.appendChild(spanBringToBack);
            divSecondPart.appendChild(divBringToBack);
            
            buttonsLayer.push(new ButtonLayer(key.toLowerCase(), ButtonType.Delete, divDelete, div));
            buttonsLayer.push(new ButtonLayer(key.toLowerCase(), ButtonType.BringToFront, divBringToFront, div));
            buttonsLayer.push(new ButtonLayer(key.toLowerCase(), ButtonType.BringToBack, divBringToBack, div));

            div.appendChild(divFirstPart);
            div.appendChild(divSecondPart);
            return div;
        });

        const OPTIONS: HTMLDivElement = document.createElement("div");
        OPTIONS.setAttribute("class", "w-full h-7 flex justify-end mb-6");

        const closeBtn: HTMLDivElement = document.createElement("div");
        closeBtn.setAttribute("title", "Fermer la fenêtre");
        closeBtn.setAttribute("class", "btn h-7 w-7 hover:bg-gray-600 rounded");
        closeBtn.style.backgroundImage = "url('icons/close-svgrepo-com.svg')";

        const svg = document.createElement("svg");
        svg.setAttribute("class", "w-3 h-3");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 14 14");

        const path = document.createElement("path");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("d", "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6");

        svg.appendChild(path);

        closeBtn.appendChild(svg);

        // Ajout des éléments au DOM
        const REF_MAIN = document.body.querySelector("main");
        // Ajout du modal au body
        REF_MAIN!.insertBefore(modal, REF_MAIN!.firstChild);
        modal.appendChild(card);
        card.appendChild(content);
        OPTIONS.appendChild(closeBtn)
        innerContent.appendChild(OPTIONS)
        content.appendChild(innerContent);
        innerContent.appendChild(title);
        innerContent.appendChild(paragraph);
        innerContent.appendChild(container);

        divFields.forEach(div => container.appendChild(div));

        return {
            "closeBtn": closeBtn,
            "modal": modal,
            "card": card,
            "container": container,
            "buttons": buttonsLayer
        };
    }
}
