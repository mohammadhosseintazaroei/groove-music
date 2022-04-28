export default function UseFetch(url , setItemsState) {
    async function getItems(urlGetItem) {
        const Items = await fetch(urlGetItem);
        return await (await Items).json()
    }
    function thenItems(url ,setItemsState) {
        getItems(url).then(items => setItemsState(items))
    }
    return { thenItems }
    // return thenItems = module.exports(thenItems)
}


