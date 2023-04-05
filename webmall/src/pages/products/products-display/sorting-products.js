export const sortFunction = (products, sortBy) => {
    const sortCondition = (a, b, sortBy) =>{
        switch (sortBy) {
            case 'NAME_ASC':
                return a.name.localeCompare(b.name)
            case 'NAME_DESC':
                return b.name.localeCompare(a.name)
            case 'PRICE_ASC':
                return a.price - b.price
            case 'PRICE_DESC':
                return b.price - a.price
            case 'DEFAULT':
                return a.id - b.id
            default:
                return 0
        }
    }
    return products && products.sort((a, b) => sortCondition(a, b, sortBy))
}