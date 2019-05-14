export const getTimeInterval = (valueTime: number) => {
    return Math.round((Date.now() - valueTime) / 1000);
};
