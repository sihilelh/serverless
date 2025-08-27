export const getFormValues = (form: HTMLFormElement) => {
    if (form) {
        const formData = new FormData(form);
        const values: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            values[key] = value;
        });
        return values;
    } else {
        return {};
    }
}
