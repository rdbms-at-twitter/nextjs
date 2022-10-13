import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取得する。
export function getPostsData() {
    //const fetchData = await fetch("API End Point")

    const fileNames = fs.readdirSync(postsDirectory);
    //file名をARRAYとして取得 
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/,"");
        //拡張子を取り除いて。ファイル名（id)にする処理。

        const fullPath = path.join(postsDirectory, fileName);
        //マークダウンファイルを文字列として読み取る。
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);
        // npm i gray-matterで追加モジュールインストール済み

        return {
            id,
            ...matterResult.data,
            //idとデータを返す：allPostsDataの戻り値
        };
    });
    return allPostsData; //getPostsDataのRetuen値
}

//getStaticPathでReturnで利用するPathを取得する。URLにデータを返す。
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                // Pages/posts/[id].jsとマッチさせる。
                id: fileName.replace(/\.md$/,""),
            },
        };
    });
}

// idに基づいて、データを返す処理を追加。

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content);
    //npm i remark remark-html

    const blogContentHTML = blogContent.toString();


    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}