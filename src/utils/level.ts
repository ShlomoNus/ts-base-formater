export function getLevelByEnv(env: string = 'development') {
    const isDevelopment = env === 'development';

    return isDevelopment ? 'debug' : 'warn';
}
