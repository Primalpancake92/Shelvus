import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useRegister from "./useRegister";

const user = {
    email: "test.user@example.com",
    password: "Test@1234",
    username: "testuser",
    firstName: "Test",
    lastName: "User"
};

// Calls registerUser with the test user's details, in the order the hook expects.
const register = (result) => result.current.registerUser(
    user.email, user.password, user.username, user.firstName, user.lastName
);

// Builds a fake fetch response, so the tests don't need the backend running.
const fakeResponse = (status, body) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body
});

describe("useRegister", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
        // Keeps the hook's error logging out of the test output.
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("starts with no error and not loading", () => {
        const { result } = renderHook(() => useRegister());

        expect(result.current.error).toBe(false);
        expect(result.current.loading).toBeFalsy();
    });

    it("sends the user's details to the register endpoint", async () => {
        fetch.mockResolvedValue(fakeResponse(200, { message: "registered" }));
        const { result } = renderHook(() => useRegister());

        await act(() => register(result));

        expect(fetch).toHaveBeenCalledTimes(1);
        const [url, options] = fetch.mock.calls[0];
        expect(url).toBe("http://127.0.0.1:3000/user/register");
        expect(options.method).toBe("POST");
        expect(options.credentials).toBe("include");
        expect(JSON.parse(options.body)).toEqual({
            email: user.email,
            password: user.password,
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            account_active: 1
        });
    });

    it("returns true and sets no error when registration succeeds", async () => {
        fetch.mockResolvedValue(fakeResponse(200, { message: "registered" }));
        const { result } = renderHook(() => useRegister());

        let returned;
        await act(async () => { returned = await register(result); });

        expect(returned).toBe(true);
        expect(result.current.error).toBe(false);
        expect(result.current.loading).toBe(false);
    });

    it("is loading while the request is in progress", async () => {
        // A fetch that only finishes when the test says so.
        let finishFetch;
        fetch.mockReturnValue(new Promise((resolve) => { finishFetch = resolve; }));
        const { result } = renderHook(() => useRegister());

        let request;
        act(() => { request = register(result); });
        await waitFor(() => expect(result.current.loading).toBe(true));

        await act(async () => {
            finishFetch(fakeResponse(200, { message: "registered" }));
            await request;
        });
        expect(result.current.loading).toBe(false);
    });

    it("returns false and sets error when the server rejects the user", async () => {
        fetch.mockResolvedValue(fakeResponse(500, {
            message: "Server could not create user.",
            error: "UNIQUE constraint failed: User.email"
        }));
        const { result } = renderHook(() => useRegister());

        let returned;
        await act(async () => { returned = await register(result); });

        expect(returned).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.loading).toBe(false);
    });

    it("returns false and sets error when the server can't be reached", async () => {
        fetch.mockRejectedValue(new TypeError("fetch failed"));
        const { result } = renderHook(() => useRegister());

        let returned;
        await act(async () => { returned = await register(result); });

        expect(returned).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.loading).toBe(false);
    });

    it("clears an old error when the user tries again and succeeds", async () => {
        fetch.mockResolvedValueOnce(fakeResponse(500, { message: "failed" }));
        fetch.mockResolvedValueOnce(fakeResponse(200, { message: "registered" }));
        const { result } = renderHook(() => useRegister());

        await act(() => register(result));
        expect(result.current.error).toBe(true);

        await act(() => register(result));
        expect(result.current.error).toBe(false);
    });

    it("never logs the user's password", async () => {
        fetch.mockResolvedValue(fakeResponse(500, { message: "failed" }));
        const { result } = renderHook(() => useRegister());

        await act(() => register(result));

        const logged = console.log.mock.calls.flat().join(" ");
        expect(logged).not.toContain(user.password);
    });
});
