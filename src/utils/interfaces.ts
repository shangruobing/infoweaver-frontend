export declare interface message {
    type?: string;
    author?: string;
    data: {
        text?: string;
        meta?: string;
        emoji?: string;
        url?: string;
    };
}
export declare interface notice {
    id?: string;
    name?: string;
    url?: string;
}
export interface record {
    question: string;
    state: number;
    history: { context: any };
    count: number;
}

//按理说不需要这样写，可能是Vite的编译问题
export let message: message;
export let notice: notice;
export let record: record;
