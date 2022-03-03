import React, {useCallback} from "react";

export const useMessage = () => {
    return useCallback(text => {
        console.log('Use Message:', text)
        if (window.M && text) {
            window.M.toast({html: text})
        }
    })
}