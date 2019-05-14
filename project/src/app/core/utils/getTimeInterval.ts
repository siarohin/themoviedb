export const getTimeInterval = (totalTime: number, valueTime: number) => {
    return Math.round((totalTime - valueTime) / 1000);
};
