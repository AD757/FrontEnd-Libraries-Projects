import React from 'react';

export const Editor = ({ text, onTextChange }) => (
    <div className="editor">
        <p className="title">Editor</p>
        <textarea id="editor" value={text} onChange={onTextChange} />
    </div>
);
