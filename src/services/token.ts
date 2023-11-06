export function getToken() {
    try {
        const jsonString = window.localStorage.getItem("admin");
        if (!jsonString) return null; // Проверка, есть ли вообще данные под этим ключом

        const parsedData = JSON.parse(jsonString);
        const authData = JSON.parse(parsedData.auth);
        return authData.session.token;
    } catch (error) {
        console.error("Ошибка при извлечении токена:", error);
        return null;
    }
}

export function getOrganizationId() {
    try {
        const jsonString = window.localStorage.getItem("admin");
        if (!jsonString) return undefined; // Проверка, есть ли вообще данные под этим ключом

        const parsedData = JSON.parse(jsonString);
        const authData = JSON.parse(parsedData.auth);;

        const user = authData.user;
        if (user && user.organization_id !== undefined) {
            return Number(user.organization_id);
        } else {
            console.error("Отсутствует organization_id в данных пользователя.");
            return undefined;
        }
    } catch (error) {
        console.error("Ошибка при извлечении organization_id:", error);
        return undefined;
    }
}