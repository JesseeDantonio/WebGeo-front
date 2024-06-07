let handlerChangeSelectRecipe: (e: Event) => void;


const handleSelect = (
    e: Event,
    REF_SELECT_SCHEMA: HTMLSelectElement,
    REF_SELECT_TABLE: HTMLSelectElement
) => {
    const SCHEMA = REF_SELECT_SCHEMA.value;

    if (!isEmpty(SCHEMA)) {
        fetch(`/api/tables/${SCHEMA}`)
            .then(response => {
                if (!response.ok) {
                    response.json().then(data => {
                        const ERROR: string = data as string;
                        throw new Error(ERROR);
                    });
                }
                return response.json();
            })
            .then(data => {
                // Supprimez toutes les options en parcourant les éléments enfants.
                while (REF_SELECT_TABLE.firstChild) {
                    REF_SELECT_TABLE.removeChild(REF_SELECT_TABLE.firstChild);
                }
                const ARR: string[] = [];
                data.forEach((element: { table_name: string }) => {
                    ARR.push(element.table_name);
                });
                for (let index = 0; index < ARR.length; index++) {
                    const ELEMENT = ARR[index];
                    const OPTION = document.createElement('option');
                    OPTION.textContent = ELEMENT;
                    OPTION.value = ELEMENT;
                    REF_SELECT_TABLE.appendChild(OPTION);
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        while (REF_SELECT_TABLE.firstChild) {
            REF_SELECT_TABLE.removeChild(REF_SELECT_TABLE.firstChild);
        }
    }

    function isEmpty(str: string): boolean {
        return str.trim().length === 0;
    }
}


const onChangeSelectRecipe = (
    REF_SELECT_SCHEMA: HTMLSelectElement,
    REF_SELECT_TABLE: HTMLSelectElement
) => {
    handlerChangeSelectRecipe = (e: Event) => handleSelect(e, REF_SELECT_SCHEMA, REF_SELECT_TABLE);
    REF_SELECT_SCHEMA?.addEventListener('change', handlerChangeSelectRecipe);
};

export { onChangeSelectRecipe, handlerChangeSelectRecipe };
