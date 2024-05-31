export const getRandomPosition = (): {x: number, y: number, t: number, b: number} => {
    const x = Math.floor(Math.random() * (window.innerWidth - 100));
    const y = Math.floor(Math.random() * (window.innerHeight - 100));
    const t = Math.floor(Math.random() * (window.innerHeight - 100))
    const b = Math.floor(Math.random() * (window.innerHeight - 100));
    return { x, y, t, b };
};
