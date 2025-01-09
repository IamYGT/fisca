declare global {
    interface Window {
        route: (name: string, params?: Record<string, any>, absolute?: boolean) => string;
    }
}

declare function route(
    name: string,
    params?: Record<string, any>,
    absolute?: boolean
): string;

export { route };
