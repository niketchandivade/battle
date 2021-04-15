export const getList = (battleData = []) => {
    return [...new Set(battleData.map(x => x.location))];
};

export const getCount = (battleData = []) => {
    return Math.max(...battleData.map(x => parseInt(x.battle_number)));
}
