import { getArticleDirectories } from "../../App.js";

export const articleTypes = {
    blog: "blog_articles",
    project: "project_articles"
}

const loadArticleMetadata = async (articleType, articleDirectory) => {
    const response = await fetch(`/articles/${articleTypes[articleType]}/${articleDirectory}/metadata.json`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const metadata = await response.json();
    return metadata;
};

export const loadArticleMetadatas = async (articleType) => {
    const articleDirectories = await getArticleDirectories(articleType);
    const articleMetadatas = await Promise.all(articleDirectories.map(dir => loadArticleMetadata(articleType, dir)));
    return articleMetadatas
};