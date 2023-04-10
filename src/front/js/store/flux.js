const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            auth: false,
        },
        actions: {
            createUser: (username, email, password) => {
                fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        body: JSON.stringify({
                            username,
                            email,
                            password,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((resp) => resp.json())
                    .then((data) => console.log(data));
            },
            login: (email, password) => {
                fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),

                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((resp) => {
                        if (resp.status == 200) {
                            setStore({
                                auth: true,
                            });
                        } else {
                            throw new Error("Contraseña incorrecta");
                        }
                        return resp.json();
                    })
                    .then((data) => localStorage.setItem("token", data.token))
                    .catch((error) => alert(error));
            },
            logout: () => {
                const store = getStore();
                if ((store.auth = true)) {
                    setStore({
                        auth: false,
                    });
                    localStorage.removeItem("token");
                }
            },
        },
    };
};

export default getState;