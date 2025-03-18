import { Theme } from "../types/Theme";
import { ThemeColors } from "../types/ThemeColors";

export const common = {
    orange:"#F14A00",
    green:"#06D001",
    light_green:"#00FF9C",
    blue:"#0D92F4",
    gray:"#A6AEBF",
    light_gray:'#F5F7F8'
}
const lightTheme:Theme = {
    title:"light",
    colors:{
        text:{
            primary:'#09122C',
            secondary:'#9AA6B2'
        },
        background:{
            primary:'#FAFAF6',
            secondary:'#DDDDDD'
        },
        selection:'#4671ED'
    }
}

const darkTheme:Theme = {
    title:'dark',
    colors:{
        text:{
            primary:"#F8F8F8",
            secondary:"#878C98"
        },
        background:{
            primary:'#000000',
            secondary:'#32353C'
        },
        selection:"#4671ED"
    }
}

export {lightTheme, darkTheme};