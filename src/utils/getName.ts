export default function getName(rawName : string, replacable: string | null = null){
    //more logic if required
    if(rawName === null) rawName = "";
    const spliter = rawName.split('@')[0];
    if((spliter !== rawName && spliter.length <= 12) || replacable === null) return spliter;
    return replacable;
}