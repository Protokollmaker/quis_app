import { browser } from "$app/environment";
import { supabaseClient } from "$lib/func/Clients/supabase";

const uploadedImages: Array<string> = [];

export async function uploadImages(img: Array<File>, userid: string) {
    if (userid) return null;
    const filepaths: Array<string> = [];
    const path = userid + '/';
    const errors: Array<any> = [];
    for (const file of img) {
        const ret = await uploadImage(file, userid);
        filepaths.push(path + file.name);
        if (ret?.error) errors.push(ret?.error);
    }
    return { paths: filepaths, errors: errors };
}

export async function uploadImage(img: File, userid: string | null, bucket = 'Question images') {
    if (!browser) return;
    console.log(img)
    if (!userid) return {
        path: null, error: "user id is undefinde"
    };
    if (!img) return {
        path: undefined, error: "image is undefinde"
    }
    const path = userid + '/';
    const index = uploadedImages.findIndex((item) => item === `${img.name}: ${img.size}`);
    if (index == -1) {
        uploadedImages.push(`${img.name}: ${img.size}`);
        // uplade file hier
        const res = await supabaseClient.storage
            .from(bucket)
            .upload(path + img.name, img, {
                cacheControl: '3600',
                upsert: false
            });
        if (res.error) {
            return {
                path: path + img.name, error: res.error
            }
        };

    }
    return { path: path + img.name, error: null }
}