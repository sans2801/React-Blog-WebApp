import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = (props)=>{

  return(
        <div className='editor'>
        <Editor
            apiKey={ process.env.REACT_APP_TINYMCE_KEY }
            initialValue={props.initialBody}
            onInit={(evt, editor) => props.setBody(editor)}
            init={{
            height: 500,
            menubar: 'file edit view insert format tools table help',
            plugins: [
                'advlist autolink emoticons lists advlist link image media charmap code codesample print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount hr'
            ],
            toolbar: 'undo redo | bold italic underline strikethrough hr fullscreen | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | ltr rtl',
            
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />

        
        </div>
    )
}

export default EditorComponent