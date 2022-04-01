export declare interface message {
    type: string;
    author: string;
    data: {
        text?: string;
        meta?: string;
        emoji?: string;
        url?: string;
    };
}
export declare interface notice {
    name?: string;
    id?: number;
    url?: string;
}
interface history {
    id: number;
    context: string;
}

//按理说不需要这样写，可能是Vite的编译问题
export let message: message;
export let notice: notice;
