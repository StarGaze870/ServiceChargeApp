import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { useEffect, useState } from 'react';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = ({

    getFilesCallback,
    maxFiles=3,
    lableIdle='Drag & Drop your attachment'

}) => {

    const [files, setFiles] = useState([])
    const [fileCount, setFileCount] = useState(0)

    useEffect(() => {

        // TODO: call getFilesCallback({files: files})
        setFileCount(files.length)

    }, [files])


    return (        
        <FilePond            
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={maxFiles}
            // server="/api"
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle={`[${fileCount}/${maxFiles}] ${lableIdle} or <span class="filepond--label-action">Browse</span>`}
        />        
    );
}

export default FileUpload;