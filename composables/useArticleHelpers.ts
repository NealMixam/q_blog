export const useArticleHelpers = () => {
    const getImageUrl = (id: string | number) => `https://picsum.photos/seed/${id}/800/600`

    return { getImageUrl }
}