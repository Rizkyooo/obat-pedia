"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import HardBreak from "@tiptap/extension-hard-break";
const Tiptap = ({ onChange, content }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };
  console.log(content);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      HardBreak.extend({
        addKeyboardShortcuts () {
          return {
            Enter: () => this.editor.commands.setHardBreak()
          }
        }
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-600 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="max-w-screen">
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{ whiteSpace: "pre-line", maxWidth: "inherit" }} editor={editor} />
      {/* <div className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg mt-6" style={{ whiteSpace: "pre-line" }}>
        {parse(content)}
      </div> */}
      
    </div>
  );
};

export default Tiptap;