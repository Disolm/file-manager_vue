<script lang="tsx">
import {defineComponent} from 'vue'
import UiFileOrFolder from "@/components/UiFileOrFolder.vue";
import {generateId} from "../../plugins/generatorId";
import type {IFolderTree, TypePath} from '@/types/types'
const pathNull = []
export default defineComponent({
    name: 'file-track',
    props: {
        dataFiles: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    methods: {
        renderUi(name: string, obj: IFolderTree, fullPath: TypePath) {
            const keyEl: string = generateId()
            return (<>
                <UiFileOrFolder directory={obj} key={keyEl} path={fullPath}>
                    {name}
                </UiFileOrFolder>
                <div class="file-track__tab">
                    {
                        obj.type === 'directory' &&  this.readFilesAndFoldersInFolder(obj.files as IFolderTree, fullPath)
                    }
                </div>

            </>)
        },
        readFilesAndFoldersInFolder(data: IFolderTree, path: TypePath) {
            return Object.entries(data).map(([keyItem, valueItem]) => {
                const fullPath: TypePath = path.concat([keyItem])
                return this.renderUi(keyItem, valueItem as IFolderTree, fullPath)
            })
        },
    },
    render() {
        return (
            <div class='file-track'>
                {this.readFilesAndFoldersInFolder(this.dataFiles.files, pathNull)}
            </div>
        )
    }
})
</script>

<style scoped lang="scss">
.file-track {
    &__tab {
        margin-left: 12px;
    }
}
</style>