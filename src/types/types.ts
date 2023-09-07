export type TypeFolderTree = {}
export interface IFolderTree {
    [key: string]: string | TypeFolderTree
}

export type TypePath = (string | number)[] | []

// interface ITypes {
//     [key: string]: string
// }
// const types: ITypes = {
//     "object": "object",
//     "array": "array",
//     "null": "null",
//     "number": "number",
//     "boolean": "boolean",
//     "string": "string",
//     "undefined": "undefined"
// }
// export function whatType(event: any){
//     if (Array.isArray(event)) {
//         return types.array
//     } else if (event === null) {
//         return types.null
//     } else {
//         return typeof event
//     }
// }