'use client';

export function validationCheck(content: string, mode: string = 'del_all_space'){
    var newContent = 'error'
    if( mode === 'del_all_space' ){
        newContent = content.replace(/\s+/g,'');
    };
    return newContent;
};

export function validationCheck_comment(content: string){
    const newContent = content.replace(/\s+/g,'');
    if(newContent.length > 0){
        return content;
    }
    return false;
};