export type TypeFolderTree = {}
export interface IFolderTree {
    [key: string]: string | TypeFolderTree

}

export type TypePath = string[] | []

