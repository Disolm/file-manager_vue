<script lang="tsx">
import {defineComponent} from 'vue'
import type { PropType,  } from 'vue'
import UiFileOrFolder from "@/components/UiFileOrFolder.vue";
import {generateId} from "@/plugins/generatorId";
import type {IFolderTree, TypePath} from '@/types/types'
const pathNull: TypePath = []
export default defineComponent({
    name: 'file-track',
    props: {
        dataFiles: {
            type: Object as PropType<IFolderTree>,
            required: true,
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
            const arrKeyValue: [string, (string | {})][] = Object.entries(data)
            return arrKeyValue.map(([keyItem, valueItem]) => {
                const fullPath: TypePath = (path as string[]).concat([keyItem])
                return this.renderUi(keyItem as string, valueItem as IFolderTree, fullPath)
            })
        },
    },
    render() {
        return (
            <div class='file-track'>
                {this.readFilesAndFoldersInFolder(this.dataFiles.files as IFolderTree, pathNull)}
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