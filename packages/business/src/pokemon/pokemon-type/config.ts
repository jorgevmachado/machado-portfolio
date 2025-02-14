interface TypeColor {
    id: number;
    name: string;
    textColor: string;
    backgroundColor: string;
}
const TYPE_COLORS: Array<TypeColor> = [
    { id: 1, name: 'ice', textColor: '#fff', backgroundColor: '#51c4e7' },
    { id: 2, name: 'bug', textColor: '#b5d7a7', backgroundColor: '#482d53' },
    { id: 3, name: 'fire', textColor: '#fff', backgroundColor: '#ff2400' },
    { id: 4, name: 'rock', textColor: '#fff', backgroundColor: '#a38c21' },
    { id: 5, name: 'dark', textColor: '#fff', backgroundColor: '#707070' },
    { id: 6, name: 'steel', textColor: '#fff', backgroundColor: '#9eb7b8' },
    { id: 7, name: 'ghost', textColor: '#fff', backgroundColor: '#7b62a3' },
    { id: 8, name: 'fairy', textColor: '#cb3fa0', backgroundColor: '#c8a2c8' },
    { id: 9, name: 'water', textColor: '#fff', backgroundColor: '#72c8dd' },
    { id: 10, name: 'grass', textColor: '#8b4513', backgroundColor: '#b9cc50' },
    { id: 11, name: 'normal', textColor: '#000', backgroundColor: '#fff' },
    { id: 12, name: 'dragon', textColor: '#fff', backgroundColor: '#FF8C00' },
    {
        id: 13,
        name: 'poison',
        textColor: '#f5f5f5',
        backgroundColor: '#8b008b',
    },
    {
        id: 14,
        name: 'flying',
        textColor: '#424242',
        backgroundColor: '#3dc7ef',
    },
    {
        id: 15,
        name: 'ground',
        textColor: '#f5f5f5',
        backgroundColor: '#bc5e00',
    },
    { id: 16, name: 'psychic', textColor: '#fff', backgroundColor: '#f366b9' },
    {
        id: 17,
        name: 'electric',
        textColor: '#0000ff',
        backgroundColor: '#ffff40',
    },
    { id: 18, name: 'fighting', textColor: '#fff', backgroundColor: '#d56723' },
];

export const findColor = (name: string, text_color: string, background_color: string) => {
    const { textColor = '#FFF', backgroundColor = '#000'} = TYPE_COLORS.find((color) => color.name === name);
    return {
        text_color: text_color ?? textColor,
        background_color: background_color ?? backgroundColor,
    }
};