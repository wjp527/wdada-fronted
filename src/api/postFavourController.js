// @ts-ignore
/* eslint-disable */
import request from "@/request";
/** doPostFavour POST /api/post_favour/ */
export async function doPostFavourUsingPost(body, options) {
    return request("/api/post_favour/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}
/** listFavourPostByPage POST /api/post_favour/list/page */
export async function listFavourPostByPageUsingPost(body, options) {
    return request("/api/post_favour/list/page", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}
/** listMyFavourPostByPage POST /api/post_favour/my/list/page */
export async function listMyFavourPostByPageUsingPost(body, options) {
    return request("/api/post_favour/my/list/page", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}
