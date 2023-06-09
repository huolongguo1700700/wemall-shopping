export default function Classify (categoriesInfo) {
    /* An additional category for all products */
    const oneMoreLine = {
        id: 0,
        name: "All Collections",
        subsequence: [],
    }
    
    /* There must be sequence = 0 in the first of categories list */
    const sortedCate = categoriesInfo.sort((a, b) => {return a.sequence - b.sequence})
    
    /* Categories drop-down navigation Object-recreate */
    const arr =  sortedCate.reduce((acc, cate) => {
        /* The first outer sequence */
        if (cate.sequence === 0) {
            acc.push({
                id: cate.id,
                name: cate.name,
                subsequence: []
            })
        }
        
        /* The lower children sequence */
        else if (cate.sequence === 1) {
            // Find out the parent category position/index
            const parentIndex = acc.findIndex(parent => parent.id === cate.parentId)
            // Push the current category into the parent's sequence
            acc[parentIndex].subsequence.push({id: cate.id, name: cate.name, subsequence: []})
        }
        
        /* The last sequence, but not in use */
        else if (cate.sequence === 2) {
            const parentIndex = acc.findIndex(parent => parent.subsequence.find(child => child.id === cate.parentId))
            acc[parentIndex].subsequence.find(child => child.id === cate.parentID).subsequence.push({
                id: cate.id,
                name: cate.name
            })
        }
        
        /* Sorting by category name and locking "Others" to the end of the list */
        const specialString = "Others"
        return acc.sort((a, b) =>
            (a.name.includes(specialString) && !b.name.includes(specialString)) ?
                1
            :
                ((!a.name.includes(specialString) && b.name.includes(specialString)) ?
                    -1
                :
                    0
                ))
    }, [])
    
    arr.unshift(oneMoreLine)
    return arr
}

