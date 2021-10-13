export const isLetters = letter => {
    return letter.match(/^[^a-zA-Z ]+$/) ? true : false;
};

export const getNameFromPath = str => {
    return str?.slice(str?.lastIndexOf('/'), -1);
};
