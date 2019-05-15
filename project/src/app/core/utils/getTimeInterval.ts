export const getTimeInterval = (
    valueTime: number,
    initialTime: number = Date.now()
) => {
    return Math.round((initialTime - valueTime) / 1000);
};
