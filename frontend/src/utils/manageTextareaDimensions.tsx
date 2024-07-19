
//use this if you have several textareas in a form, on the onChange form action
export const handleAutoGrowTextarea = (e: { target: HTMLTextAreaElement; }) => {
    if (e.target.tagName.toLowerCase() === 'textarea') {
        autoGrowTextarea(e.target);
    }
};


//call this function on onChange on the textarea element
export function autoGrowTextarea(textareaElement: HTMLTextAreaElement) {
    textareaElement.style.height = 'auto';
    textareaElement.style.height = textareaElement.scrollHeight + 'px';

}