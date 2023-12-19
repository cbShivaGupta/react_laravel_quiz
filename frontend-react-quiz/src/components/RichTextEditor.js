// RichTextEditor.js
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '../../../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.css'; // Import the default CKEditor styles

const RichTextEditor = ({ data, onDataChange }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          onDataChange(data);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
