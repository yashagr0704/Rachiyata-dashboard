import dynamic from 'next/dynamic'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import { useCallback, useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default

export default function StyledEditor({
  onChange,
  isFetchSuccess,
  value,
  setIsInitialized,
  isInitialized,
  defaultValues,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = useCallback(
    editorState => {
      setEditorState(editorState)
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      if (value !== html) onChange(html)
    },
    [onChange, value],
  )

  useEffect(() => {
    if (isFetchSuccess && !isInitialized) {
      if (typeof defaultValues === 'string' && defaultValues !== '' && htmlToDraft) {
        const blocksFromHtml = htmlToDraft(defaultValues)
        const { contentBlocks, entityMap } = blocksFromHtml
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
        const newEditorState = EditorState.createWithContent(contentState)
        setEditorState(newEditorState)

        const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
        if (value !== html) onChange(html)

        setIsInitialized(true)
      } else {
        setIsInitialized(true)
      }
    }
  }, [isFetchSuccess, setIsInitialized, defaultValues, onChange, value, isInitialized])

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder="Write something here..."
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbarProps}
      />
    </>
  )
}

const toolbarProps = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'embedded',
    'emoji',
    'history',
    'image',
  ],

  inline: { inDropdown: false },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  fontFamily: {
    options: ['Inter', 'Poppins'],
  },
}
