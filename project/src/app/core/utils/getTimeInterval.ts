export const getTimeInterval = (valueTime: number, initialTime?: number) => {
    if (initialTime) {
        return Math.round((initialTime - valueTime) / 1000);
    }
    return Math.round((Date.now() - valueTime) / 1000);
};
