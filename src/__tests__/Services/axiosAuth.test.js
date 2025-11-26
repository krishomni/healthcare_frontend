    import axiosAuth from "../../utils/axiosAuth";

    describe("axiosAuth helper", () => {
    afterEach(() => {
        localStorage.clear();
    });

    test("uses VITE_API_URL as baseURL", () => {
        // As long as your jest setup sets import.meta.env, this will pass
        expect(axiosAuth.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    });

    test("adds Authorization header when token exists", async () => {
        localStorage.setItem("token", "test-token");

        // Axios stores interceptor callbacks in handlers[0].fulfilled
        const handler = axiosAuth.interceptors.request.handlers[0].fulfilled;
        const config = await handler({ headers: {} });

        expect(config.headers.Authorization).toBe("Bearer test-token");
    });


    test("request interceptor error handler rethrows the error", async () => {
    // Grab the error handler (second argument to interceptors.request.use)
    const errorHandler = axiosAuth.interceptors.request.handlers[0].rejected;

    const error = new Error("boom");
    await expect(errorHandler(error)).rejects.toThrow("boom");
    });


    test("does not add Authorization header when token is missing", async () => {
        localStorage.removeItem("token");

        const handler = axiosAuth.interceptors.request.handlers[0].fulfilled;
        const config = await handler({ headers: {} });

        expect(config.headers.Authorization).toBeUndefined();
    });
    });
