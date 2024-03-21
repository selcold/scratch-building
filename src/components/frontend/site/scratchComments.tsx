import { _ScratchCommentsConfig } from "@/components/backend/scratch/comments";
import { ScratchCommentsConfig } from "../../../../scratchComments.config";
import { API_gas_backendApi_new_commentSend } from "@/components/backend/comments";

export function ScratchComment_Check(username: string, content: string) {
    const config = ScratchCommentsConfig as _ScratchCommentsConfig;

    let tag = "null";
    let error = false;
    let error_message = null;

    const noSpaceContent = content.replace(/\s+/g,'');
    if(noSpaceContent.length < 1){
        error=true;
        error_message="At least one non-space character is required!";
    };
    if(config.max_length){
        if(config.max_length < content.length){
            error=true;
            error_message="The maximum character limit is 500 characters.";
        };
    };
    if(config.min_length){
        if(config.min_length > content.length){
            error=true;
            error_message="The maximum character limit is 500 characters.";
        };
    };
    
    if(config.administrator){
        if(config.administrator.includes(username)){
            tag="developer";
        }
    }

    if(error){
        return { status: false, content: error_message };
    }else{
        const newContent = content.replace(/\s+/g,'\n');
        return  { status: true, content: newContent, tag: tag };
    };
};