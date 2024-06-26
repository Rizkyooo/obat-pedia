import React, { useState, useEffect, useRef } from 'react'
import parse from 'html-react-parser';

export default function Editor () {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  const [data, setData] = useState('Tulis Artikel Disini')

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor ,// v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])

  return editorLoaded ? (
    <>
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onInit={editor => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        setData(editor.getData())
        console.log({ event, editor, data })
      }}
    />
          <div className='max-w-2xl border-2 p-2'>{parse(data)}</div>
    </>
  ) : (
    <div>loading...</div>
  )
}